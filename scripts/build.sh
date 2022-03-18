
#!/bin/sh -e

PROJECT_ROOT="$(cd $(dirname $0)/..; pwd)"

cd $PROJECT_ROOT

if [ "$BUILD_ENV" = "web" ]; then
  yarn start:sylius
elif [ "$BUILD_ENV" = "docs" ]; then
  yarn workspace api build
else
  echo "Error: no build config for INATO_BUILD_ENV value '$INATO_BUILD_ENV'"
  exit 1
fi
