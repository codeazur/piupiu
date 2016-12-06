defmodule Piupiu.Repo.Migrations.MakeUsernameAndEmailCaseInsensitive do
  use Ecto.Migration

  def change do
    execute "CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public"

    alter table(:users) do
      modify :email, :citext
    end

    alter table(:accounts) do
      modify :username, :citext
      modify :domain, :citext
    end
  end
end
