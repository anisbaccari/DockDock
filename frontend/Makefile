SRC=frontend
OUT_SRC=frontend-dev
DIR=$(CURDIR)
NETWORK=transcendance

all : 
	@docker build -t $(SRC) .

clean:
	@docker stop $$(docker ps -qa);\
	docker rm $$(docker ps -qa);\
	docker rmi -f $$(docker images -qa);


status:
	@clear
	@echo "\nCONTAINERS\n"
	@docker ps -a
	@echo "\nIMAGES\n"
	@docker image ls
	@echo "\nVOLUMES\n"
	@docker volume ls
	@echo "\nNETWORKS\n"
	@docker network ls --filter "name=$(NAME)_all"
	@echo ""

# remove all containers, images, volumes and networks to start with a clean state
fclean:
	@echo "\nPreparing to start with a clean state..."
	@echo "\nCONTAINERS STOPPED\n"
	@if [ -n "$$(docker ps -qa)" ]; then docker stop $$(docker ps -qa) ;	fi
	@echo "\nCONTAINERS REMOVED\n"
	@if [ -n "$$(docker ps -qa)" ]; then docker rm $$(docker ps -qa) ; fi
	@echo "\nIMAGES REMOVED\n"
	@if [ -n "$$(docker images -qa)" ]; then docker rmi -f $$(docker images -qa) ; fi
	@echo "\nVOLUMES REMOVED\n"
	@if [ -n "$$(docker volume ls -q)" ]; then docker volume rm $$(docker volume ls -q) ; fi
	@echo "\nNETWORKS REMOVED\n"
	@if [ -n "$$(docker network ls -q) " ]; then docker network rm $$(docker network ls -q) 2> /dev/null || true ; fi 
	@echo ""

info:
	@echo "\n# List containers \n"
	@echo " docker ps        # List running containers\n"
	@echo " docker ps -a     # List all containers including stopped ones\n"
	@echo " docker ps -qa    # List only container IDs (quiet mode) \n"
	@echo " # Container operations\n"
	@echo " docker start <container>    # Start a container\n"
	@echo " docker stop <container>     # Stop a container\n"
	@echo "docker rm <container>      # Remove a container \n"
	@echo "# List images \n"
	@echo " docker images -qa    # List only image IDs\n"
	@echo "# Image operations \n"
	@echo " docker build -t <name> .    # Build image from Dockerfile in current directory\n"
	@echo " docker rmi <image>          # Remove an image \n"
	@echo " # List volumes\n"
	@echo " docker volume ls -q  # List only volume names\n"
	@echo "# Volume operations \n"
	@echo " docker volume create <name>   # Create a volume\n"
	@echo " docker volume rm <name>       # Remove a volume\n"
	@echo " # List networks\n"
	@echo " docker network ls -q # List only network IDs\n"
	@echo " # Network operations\n"
	@echo " docker network create <name>   # Create a network\n"
	@echo " docker network rm <name>       # Remove a network\n"
	@echo " # SYStem Command\n"
	@echo " docker system prune  # Remove unused data\n"
	@echo " \n"
	

network :
	docker network create $(NETWORK)

run : 
	docker run -t -d \
  	-p 8080:8080 \
  	-v $(DIR):/app \
	--network $(NETWORK) \
  	--name $(OUT_SRC) \
    $(SRC)

exec : all run 

logs:
	docker logs -f $(OUT_SRC)
	

re : fclean network exec 


inspect-network :
	@echo "\nNetwork Connections:"
	@docker network inspect $(NETWORK)
	@echo "\nContainer IPs:"
	@docker inspect -f '{{.Name}} - {{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $(OUT_SRC)
	