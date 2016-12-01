defmodule Piupiu.RegistrationView do
  use Piupiu.Web, :view

  def render("error.json", %{changeset: changeset, error_type: error_type}) do
    %{
      error: %{
        type: error_type,
        fields: Enum.reduce(changeset.errors, %{}, &error_reducer/2)
      }
    }
  end

  defp error_reducer({field, message}, acc) do
    Map.put(acc, field, render_detail(message))
  end

  defp render_detail({text, keys}) do
    Enum.reduce(keys, text, fn {key, value}, acc -> String.replace(acc, "%{#{key}}", to_string(value)) end)
  end
end
