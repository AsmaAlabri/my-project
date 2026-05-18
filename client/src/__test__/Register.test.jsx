import { describe, test, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import Register from "../components/Register";

const renderRegister = () => {
  render(
    <BrowserRouter>
      <Register />
    </BrowserRouter>
  );
};

describe("Register Page Tests", () => {

  // ─── Rendering ───────────────────────────────────────────────────────────────

  describe("Rendering", () => {
    test("renders Registration title", () => {
      renderRegister();
      expect(screen.getByText(/registration/i)).toBeInTheDocument();
    });

    test("renders PETMATCH branding", () => {
      renderRegister();
      expect(screen.getByText(/petmatch/i)).toBeInTheDocument();
    });

    test("renders logo image", () => {
      renderRegister();
      const logo = screen.getByAltText(/register/i);
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute("src");
    });

    test("renders all four form fields", () => {
      renderRegister();
      expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });

    test("renders Register button", () => {
      renderRegister();
      expect(screen.getByRole("button", { name: /register/i })).toBeInTheDocument();
    });

    test("renders Login button", () => {
      renderRegister();
      expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    });
  });

  // ─── Field Defaults ───────────────────────────────────────────────────────────

  describe("Field Default Values", () => {
    test("first name field is empty by default", () => {
      renderRegister();
      expect(screen.getByLabelText(/first name/i).value).toBe("");
    });

    test("last name field is empty by default", () => {
      renderRegister();
      expect(screen.getByLabelText(/last name/i).value).toBe("");
    });

    test("email field is empty by default", () => {
      renderRegister();
      expect(screen.getByLabelText(/email/i).value).toBe("");
    });

    test("password field is empty by default", () => {
      renderRegister();
      expect(screen.getByLabelText(/password/i).value).toBe("");
    });
  });

  // ─── Field Attributes ─────────────────────────────────────────────────────────

  describe("Field Attributes", () => {
    test("first name field has type text", () => {
      renderRegister();
      expect(screen.getByLabelText(/first name/i)).toHaveAttribute("type", "text");
    });

    test("last name field has type text", () => {
      renderRegister();
      expect(screen.getByLabelText(/last name/i)).toHaveAttribute("type", "text");
    });

    test("email field has type email", () => {
      renderRegister();
      expect(screen.getByLabelText(/email/i)).toHaveAttribute("type", "email");
    });

    test("password field has type password", () => {
      renderRegister();
      expect(screen.getByLabelText(/password/i)).toHaveAttribute("type", "password");
    });

    test("password field masks input", () => {
      renderRegister();
      const passwordInput = screen.getByLabelText(/password/i);
      // type="password" is what causes masking in the browser
      expect(passwordInput.type).toBe("password");
    });
  });

  // ─── User Interactions ────────────────────────────────────────────────────────

  describe("User Interactions", () => {
    test("user can type into first name field", () => {
      renderRegister();
      const input = screen.getByLabelText(/first name/i);
      fireEvent.change(input, { target: { value: "John" } });
      expect(input.value).toBe("John");
    });

    test("user can type into last name field", () => {
      renderRegister();
      const input = screen.getByLabelText(/last name/i);
      fireEvent.change(input, { target: { value: "Doe" } });
      expect(input.value).toBe("Doe");
    });

    test("user can type into email field", () => {
      renderRegister();
      const input = screen.getByLabelText(/email/i);
      fireEvent.change(input, { target: { value: "john@example.com" } });
      expect(input.value).toBe("john@example.com");
    });

    test("user can type into password field", () => {
      renderRegister();
      const input = screen.getByLabelText(/password/i);
      fireEvent.change(input, { target: { value: "secret123" } });
      expect(input.value).toBe("secret123");
    });

    test("user can fill out the entire form", () => {
      renderRegister();
      fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: "John" } });
      fireEvent.change(screen.getByLabelText(/last name/i),  { target: { value: "Doe" } });
      fireEvent.change(screen.getByLabelText(/email/i),      { target: { value: "john@example.com" } });
      fireEvent.change(screen.getByLabelText(/password/i),   { target: { value: "secret123" } });

      expect(screen.getByLabelText(/first name/i).value).toBe("John");
      expect(screen.getByLabelText(/last name/i).value).toBe("Doe");
      expect(screen.getByLabelText(/email/i).value).toBe("john@example.com");
      expect(screen.getByLabelText(/password/i).value).toBe("secret123");
    });

    test("Register button is clickable", () => {
      renderRegister();
      const registerBtn = screen.getByRole("button", { name: /register/i });
      expect(registerBtn).not.toBeDisabled();
      fireEvent.click(registerBtn); // should not throw
    });
  });

  // ─── Navigation ───────────────────────────────────────────────────────────────

  describe("Navigation", () => {
    test("Login button links to home route", () => {
      renderRegister();
      const loginLink = screen.getByRole("link", { name: /login/i }) 
                     ?? screen.getByText(/login/i).closest("a");
      expect(loginLink).toHaveAttribute("href", "/");
    });
  });

  // ─── Accessibility ────────────────────────────────────────────────────────────

  describe("Accessibility", () => {
    test("all inputs are associated with labels via htmlFor/id", () => {
      renderRegister();
      // getByLabelText only succeeds when the for/id link exists
      expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });

    test("Register button has accessible name", () => {
      renderRegister();
      expect(screen.getByRole("button", { name: /register/i })).toBeInTheDocument();
    });

    test("Login button has accessible name", () => {
      renderRegister();
      expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    });
  });

});
