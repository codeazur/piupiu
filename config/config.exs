# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :piupiu,
  ecto_repos: [Piupiu.Repo]

# Configures the endpoint
config :piupiu, Piupiu.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "Cr48jmjwH/DFctoweG7YhC35jb7qt9pC2TME2bVpBly/PPSimRkS+fFKSDQmck1a",
  render_errors: [view: Piupiu.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Piupiu.PubSub,
           adapter: Phoenix.PubSub.PG2]

config :guardian, Guardian,
  issuer: "PiuPiu",
  ttl: { 3, :days },
  verify_issuer: true,
  secret_key: "H1O4o8RIEsND8IbeX7Okp7j3HL+iP1dl2+k/anXW6Ha/lM6+G4hOOwyDeGpaYK9p",
  serializer: Piupiu.GuardianSerializer

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
