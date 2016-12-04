defmodule Piupiu.Repo.Migrations.RenameUserNickIndex do
  use Ecto.Migration

  def change do
    drop index(:users, [:nick_name])
    create unique_index(:users, [:username])
   end
end
