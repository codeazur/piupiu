defmodule Piupiu.Repo.Migrations.CreateApplication do
  use Ecto.Migration

  def change do
    create table(:applications) do
      add :name, :string
      add :url, :string
      add :user_id, references(:users, on_delete: :nothing)

      timestamps()
    end
    create index(:applications, [:user_id])

  end
end
