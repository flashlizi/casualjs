SRC_DIR = src
BUILD_DIR = build
PREFIX = .
DIST_DIR = ${PREFIX}/dist
NODE ?= `which node nodejs`

BASE_FILES = ${SRC_DIR}/core/base.js\
		${SRC_DIR}/geom/Matrix.js\
		${SRC_DIR}/geom/Rectangle.js\
		${SRC_DIR}/utils/NameUtil.js\
		${SRC_DIR}/event/EventBase.js\
		${SRC_DIR}/event/StageEvent.js\
		${SRC_DIR}/event/EventManager.js\
		${SRC_DIR}/event/EventDispatcher.js\
		${SRC_DIR}/display/DisplayObject.js\
		${SRC_DIR}/display/DisplayObjectContainer.js\
		${SRC_DIR}/display/Stage.js\
		${SRC_DIR}/display/Bitmap.js\
		${SRC_DIR}/display/Sprite.js\
		${SRC_DIR}/display/Frame.js\
		${SRC_DIR}/display/MovieClip.js\
		${SRC_DIR}/display/Graphics.js\
		${SRC_DIR}/display/Shape.js\
		${SRC_DIR}/display/Text.js\
		${SRC_DIR}/display/Button.js\
		${SRC_DIR}/casual.js

MODULES = ${BASE_FILES}

CJ = ${DIST_DIR}/casualjs.js
CJ_MIN = ${DIST_DIR}/casualjs.min.js

CJ_VER = $(shell cat VERSION)
VER = sed "s/@VERSION/${CJ_VER}/"
DATE=$(shell git log -1 --pretty=format:%ad)

all: init core

core: casualjs
		@@echo "Casualjs build complete"

${DIST_DIR}:
		@@mkdir -p ${DIST_DIR}

casualjs:${CJ}

${CJ}: ${MODULES} | ${DIST_DIR}
		@@echo "Building" ${CJ}
		@@cat ${MODULES} | \
			sed 's/@DATE/'"${DATE}"'/' | \
			${VER} >  ${CJ};

init: clean ${DIST_DIR}
		@@echo "Init Over \n"

clean:
	@@echo "Removing Distribution directory:" ${DIST_DIR}
	@@rm -rf ${DIST_DIR}
