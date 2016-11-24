defmodule Piupiu.Router do
  use Piupiu.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", Piupiu do
    pipe_through :browser

    get "/*path", PageController, :index
  end

  scope "/api", Piupiu do
    pipe_through :api

    scope "/v1" do
      post "/registrations", RegistrationController, :create
    end
  end
end
