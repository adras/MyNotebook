# Actions

# login
Request:
	action: "login"

Response:
{
	isLoggedIn : bool,
	errorMessage : string,
	success : bool
}

ResponseModel: BaseResponse

# logout
Request:
	action: "logout"

Response:
{
	isLoggedIn : bool,
	errorMessage : string,
	success : bool
}

ResponseModel: BaseResponse

# Query all
Request:
	action: "queryAll"

Response:
{
	isLoggedIn : bool,
	errorMessage : string,
	success : bool,
	notes: [],
	tags: [],
	settings: {}
}

ResponseModel: QueryAllResponse


TODO

# Edit Note
Request:
	action: "editNote"
	note: TODO

Model: Note