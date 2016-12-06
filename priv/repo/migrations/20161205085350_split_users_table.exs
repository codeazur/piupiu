defmodule Piupiu.Repo.Migrations.SplitUsersTable do
  use Ecto.Migration

  def change do
    create table(:accounts) do
      add :username, :string, null: false
      add :domain, :string
      add :name, :string
      add :description, :string

      timestamps()
    end
    create unique_index(:accounts, [:username, :domain])

    alter table(:users) do
      remove :username
      remove :name
      add :account_id, references(:accounts)
    end
  end
end
