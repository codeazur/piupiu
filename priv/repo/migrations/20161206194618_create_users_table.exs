defmodule Piupiu.Repo.Migrations.CreateUsersTable do
  use Ecto.Migration

  def change do
    execute "CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public"

    create table(:users, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :email, :citext, null: false
      add :encrypted_password, :string, null: false
      timestamps()
    end

    create unique_index(:users, [:email])
  end
end
