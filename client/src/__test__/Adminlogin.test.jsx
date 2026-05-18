import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { BrowserRouter } from "react-router-dom";

import Adminlogin from "../components/Adminlogin";

// Fake Redux Store
const mockStore = configureStore({
  reducer: {
    user: () => ({
      isLoading: false,
    }),
  },
});

// Helper function
const renderAdminLogin = () => {
  return render(
    <Provider store={mockStore}>
      <BrowserRouter>
        <Adminlogin />
      </BrowserRouter>
    </Provider>
  );
};

describe("Admin Login Page Tests", () => {

  test("Renders Admin Login text", () => {
    renderAdminLogin();

    expect(
      screen.getByText(/admin login/i)
    ).toBeInTheDocument();
  });

  test("Renders restricted access text", () => {
    renderAdminLogin();

    expect(
      screen.getByText(/restricted access/i)
    ).toBeInTheDocument();
  });

  test("Renders admin email input", () => {
    renderAdminLogin();

    expect(
      screen.getByPlaceholderText(/admin@petmatch.com/i)
    ).toBeInTheDocument();
  });

  test("Renders password input", () => {
    renderAdminLogin();

    expect(
      screen.getByPlaceholderText(/enter admin password/i)
    ).toBeInTheDocument();
  });

  test("Renders login as admin button", () => {
    renderAdminLogin();

    expect(
      screen.getByRole("button", { name: /login as admin/i })
    ).toBeInTheDocument();
  });

  test("Renders back to main site link", () => {
    renderAdminLogin();

    expect(
      screen.getByText(/back to main site/i)
    ).toBeInTheDocument();
  });

  test("Should match the Snapshot", () => {
    const { asFragment } = renderAdminLogin();

    expect(asFragment()).toMatchSnapshot();
  });

});