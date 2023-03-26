init:
	cd web && yarn
	cd api && mvn install

build:
	cd api && mvn package
	cd web && yarn build

test:
	cd web yarn eslint "src/**/*.ts" "src/**/*.tsx"
	cd api && mvn test
	cd web && yarn test

start:
	docker-compose up -d

stop:
	docker-compose down

exportkc:
	docker-compose exec oauth /opt/keycloak/bin/kc.sh export --file /tmp/.config/realm.json