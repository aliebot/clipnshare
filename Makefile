postgres:
	docker run --name clipnshare -p 5432:5432 -e POSTGRES_USER=aliebot POSTGRES_PASSWORD=Alrifat1234@ -d postgres:14.4-alpine

.PHONY: all