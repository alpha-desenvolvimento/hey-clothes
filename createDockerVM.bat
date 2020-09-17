docker pull postgres
docker run --name hey-clothes -e "POSTGRES_PASSWORD=localPWDPGS" -e "POSTGRES_USER=admin" -p 5432:5432 -d postgres
