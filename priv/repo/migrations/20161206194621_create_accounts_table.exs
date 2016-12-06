defmodule Piupiu.Repo.Migrations.CreateAccountsTable do
  use Ecto.Migration

  def change do
    execute "CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public"

    create table(:accounts, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :username, :citext, null: false
      add :domain, :citext
      add :name, :string
      add :description, :string
      timestamps()
    end

    create unique_index(:accounts, [:username, :domain])
    create unique_index(:accounts, [:username], where: "domain IS NULL", name: :accounts_username_null_domain_index)

    alter table(:users) do
      add :account_id, references(:accounts, type: :binary_id)
    end

    create unique_index(:users, [:account_id])
  end
end
