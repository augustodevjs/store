docker build -t store-web ./frontend
docker build -t store-api -f ./backend/src/Store.API/Dockerfile ./backend
aws ecr get-login-password --region us-east-2 --profile store | docker login --username AWS --password-stdin 211125599520.dkr.ecr.us-east-2.amazonaws.com
docker tag store-api:latest 211125599520.dkr.ecr.us-east-2.amazonaws.com/store-api:latest
docker tag store-web:latest 211125599520.dkr.ecr.us-east-2.amazonaws.com/store-web:latest
docker push 211125599520.dkr.ecr.us-east-2.amazonaws.com/store-api:latest
docker push 211125599520.dkr.ecr.us-east-2.amazonaws.com/store-web:latest