defmodule Piupiu.UserTest do
  use Piupiu.ModelCase

  alias Piupiu.User

  @valid_attrs %{nick_name: "johndoe001", display_name: "John Doe", email: "john@doe.com", encrypted_password: "abcdef", }
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = User.changeset(%User{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = User.changeset(%User{}, @invalid_attrs)
    refute changeset.valid?
  end
end
