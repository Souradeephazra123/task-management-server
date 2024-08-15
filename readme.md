At forst clone the project and run the project by
1.npm install
2.npm run watch

You have to always run backend server

# auth:-
#### signup:- 
/signup 
post
email,password
#### login:- 
/login
post
email,password

# task

#### create task :
/task
post  
 {
"userId": 101,
"title": "Sample task 1",
"description":"This is new task 10",
"taskStatus":"pending"
}

#### get all task of a user:
/task/:id
get


#### update task of a user with title
/task
put
{
"userId": 101,(required)
"title": "Sample task 1",(required)
"description":"ki re"
}

#### delete task
/task
delete
{
"userId": 101,
"title": "Sample task 1"
}

# Project

#### create project
/project
post
{
"userId":101,
"name": "project1",
"status": "started",
"description": "mair khamu",
"startDate": "7 july 2022",
"endDate": "7 august 2022",
"priority": "low",
"projectMangaer": "ami",
"projectTeamMembers": "ami,tumi"
}

#### get selected user all project
/project/:id
get


#### updated selected project
/project
put
{
"userId":101,
"name":"project1",
"description":"babar khamu"
}

#### delete project
/project
delete
{
"userId":101,
"name":"project1"
}
