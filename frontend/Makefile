SRC=frontendv4

all : 
	@docker build -t $(SRC) .

clean:
	@docker stop $$(docker ps -qa);\
	docker rm $$(docker ps -qa);\
	docker rmi -f $$(docker images -qa);

re : clean all