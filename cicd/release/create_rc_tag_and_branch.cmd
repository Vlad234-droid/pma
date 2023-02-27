@echo off

set VERSION=%1

if "%VERSION%" == "" goto usage

set TAG_NAME=rc-%VERSION%
set BRANCH_NAME=v%VERSION%

git pull

@echo Tag %TAG_NAME% creating...
git tag -a %TAG_NAME% -m "Release candidate tag %TAG_NAME% created"
git push origin %TAG_NAME%


@echo Branch %BRANCH_NAME% from tag %TAG_NAME% creating...
git branch %BRANCH_NAME% %TAG_NAME%
git push origin %BRANCH_NAME%

exit
:usage
@echo create_rc_tag_and_branch.cmd ^<version^>
@echo - version, e.g. 1.6
