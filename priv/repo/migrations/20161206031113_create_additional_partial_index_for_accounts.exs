defmodule Piupiu.Repo.Migrations.CreateAdditionalPartialIndexForAccounts do
  use Ecto.Migration

  def change do
    create unique_index(:accounts, [:username], where: "domain IS NULL", name: :accounts_username_null_domain_index)
  end
end
