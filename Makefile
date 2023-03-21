init:
	cd web && yarn
	cd api && mvn install

start:
	docker-compose up -d

stop:
	docker-compose down

exportkc:
	docker-compose exec oauth /opt/keycloak/bin/kc.sh export --file /tmp/.config/realm.json --realm taskify