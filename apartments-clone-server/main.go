package main

import (
	"apartments-clone-server/routes"
	"github.com/joho/godotenv"
	"github.com/kataras/iris/v12"
	"apartments-clone-server/storage"
	"github.com/go-playground/validator/v10"
)

func main() {
	godotenv.Load()
	storage.InitializeDB()

	app := iris.Default()
	app.Validator = validator.New()
	location := app.Party("api/location")
	{
		location.Get("/autocomplete", routes.Autocomplete)
		location.Get("/search", routes.Search)
	}

	user := app.Party("api/user") 
	{
		user.Post("/register", routes.Register)
		user.Post("/login", routes.Login)
		user.Post("/facebook", routes.FacebookLoginOrSignUp)
		user.Post("/google", routes.GoogleLoginOrSignUp)
		user.Post("/apple", routes.AppleLoginOrSignUp)
		user.Post("/forgotpassword", routes.ForgotPassword)

	}

	app.Listen(":4000")
}