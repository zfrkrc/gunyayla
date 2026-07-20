#!/bin/sh
GHOST_VERSION_DIR="/var/lib/ghost/versions/5.130.6"

echo "[patches] Applying Ghost CMS patches..."

cp /patches/middleware.js "$GHOST_VERSION_DIR/core/server/web/api/endpoints/admin/middleware.js"
cp /patches/comments.js "$GHOST_VERSION_DIR/core/server/api/endpoints/comments.js"
cp /patches/CommentsController.js "$GHOST_VERSION_DIR/core/server/services/comments/CommentsController.js"
cp /patches/routes.js "$GHOST_VERSION_DIR/core/server/web/api/endpoints/admin/routes.js"

echo "[patches] Patches applied successfully"
