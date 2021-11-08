# default directory is /usr/src/app

cd ./$1
cd ./src
npm test > test_result.txt
cd ../
yarn start