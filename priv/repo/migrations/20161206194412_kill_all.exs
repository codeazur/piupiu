defmodule Piupiu.Repo.Migrations.KillAll do
  use Ecto.Migration

  def change do
    execute "drop table if exists users cascade"
    execute "drop table if exists accounts cascade"
    execute "drop table if exists applications cascade"
    execute "delete from schema_migrations"
  end
end
