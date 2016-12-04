defmodule Piupiu.Repo.Migrations.RenameUserNickAndDisplayName do
  use Ecto.Migration

  def change do
    rename table(:users), :nick_name, to: :username
    rename table(:users), :display_name, to: :name
  end
end
