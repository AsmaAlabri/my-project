import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { BrowserRouter } from "react-router-dom";

import Login from "../components/Login.jsx";

// Fake Redux Store
const mockStore = configureStore({
  reducer: {
    user: () => ({
      isLoading: false,
    }),
  },
});

// Helper function
const renderLogin = () => {
  return render(
    <Provider store={mockStore}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  );
};

describe("Login Page Tests", () => {

  test("Renders Login title", () => {
    renderLogin();

    expect(
      screen.getByRole("heading", { name: /login/i })
    ).toBeInTheDocument();
  });

  test("Renders email input", () => {
    renderLogin();

    expect(
      screen.getByRole("textbox")
    ).toBeInTheDocument();
  });

  test("Renders password input", () => {
  renderLogin();

  expect(
    screen.getByRole("textbox")
  ).toBeInTheDocument();
  });

  test("Renders login button", () => {
    renderLogin();

    expect(
      screen.getByRole("button", { name: /login/i })
    ).toBeInTheDocument();
  });

  test("Renders register button", () => {
    renderLogin();

    const myButton = screen.getByRole("button", {
      name: /register/i,
    });

    expect(myButton).toBeInTheDocument();
  });

  test("Renders admin button", () => {
    renderLogin();

    const myAdminButton = screen.getByRole("button", {
      name: /admin/i,
    });

    expect(myAdminButton).toBeInTheDocument();
  });

  test("Should match the Snapshot", () => {
    const { asFragment } = renderLogin();

    expect(asFragment()).toMatchSnapshot();
  });

});