# Tamplo Docker Makefile

# BUILDING
#------------------------------------------------------

# Build or rebuild services
build:
	docker-compose -f docker-compose.yml build;

# Create and start containers
up:
	docker-compose -f docker-compose.yml up -d;

# Force build + up
buildup:
	docker-compose -f docker-compose.yml up -d --build;

# Stop and remove containers, networks, images, and volumes
down:
	docker-compose -f docker-compose.yml down;

# Start services
start:
	docker-compose -f docker-compose.yml start;

# Stop services
stop:
	docker-compose -f docker-compose.yml stop;

# Restart services
restart:
	docker-compose -f docker-compose.yml restart;


# UTILS
#------------------------------------------------------

shell:
	docker exec -it server-tamplo-dev ash;

logs:
	docker logs -f server-tamplo-dev;