#!/usr/bin/env bash
set -euo pipefail

APPIMAGE_NAME="capsule-manager-1.0.0.AppImage"
APP_DIR="$HOME/Applications"
APP_PATH="$APP_DIR/$APPIMAGE_NAME"
DESKTOP_DIR="$HOME/.local/share/applications"
DESKTOP_FILE="$DESKTOP_DIR/capsule-manager.desktop"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SOURCE_APPIMAGE="$SCRIPT_DIR/$APPIMAGE_NAME"

if [ ! -f "$SOURCE_APPIMAGE" ]; then
  echo "Error: $APPIMAGE_NAME not found next to install.sh" >&2
  exit 1
fi

chmod +x "$SOURCE_APPIMAGE"
mkdir -p "$APP_DIR" "$DESKTOP_DIR"
mv "$SOURCE_APPIMAGE" "$APP_PATH"

cat > "$DESKTOP_FILE" <<EOF
[Desktop Entry]
Name=Capsule Manager
Exec=$APP_PATH
Icon=$APP_PATH
Terminal=false
Type=Application
Categories=Utility;
EOF

chmod +x "$DESKTOP_FILE"

echo "Capsule Manager installed! Launch from your app menu."
