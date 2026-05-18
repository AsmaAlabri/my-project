import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import Home from "../components/Home";

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

// Helper: render Home inside a MemoryRouter (required for NavLink & useNavigate)
const renderHome = () =>
    render(
        <MemoryRouter>
            <Home />
        </MemoryRouter>
    );

// ─────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────
describe("Navbar", () => {
    test("renders the PETMATCH brand logo", () => {
        renderHome();
        // PETMATCH appears in both navbar and footer; verify at least one exists
        const logos = screen.getAllByText("PETMATCH");
        expect(logos.length).toBeGreaterThanOrEqual(1);
    });

    test("renders all four nav links", () => {
        renderHome();
        expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /about us/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /contact us/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /profile/i })).toBeInTheDocument();
    });

    test("nav links point to the correct routes", () => {
        renderHome();
        expect(screen.getByRole("link", { name: /home/i })).toHaveAttribute("href", "/home");
        expect(screen.getByRole("link", { name: /about us/i })).toHaveAttribute("href", "/about");
        expect(screen.getByRole("link", { name: /contact us/i })).toHaveAttribute("href", "/contact");
        expect(screen.getByRole("link", { name: /profile/i })).toHaveAttribute("href", "/profile");
    });
});

// ─────────────────────────────────────────────
// HERO SECTION
// ─────────────────────────────────────────────
describe("Hero Section", () => {
    test("renders the hero headline", () => {
        renderHome();
        expect(
            screen.getByText(/where love finds a home/i)
        ).toBeInTheDocument();
    });
});

// ─────────────────────────────────────────────
// PET CATEGORIES
// ─────────────────────────────────────────────
describe("Pet Categories", () => {
    test("renders the 'Pet Categories' heading", () => {
        renderHome();
        expect(screen.getByText("Pet Categories")).toBeInTheDocument();
    });

    test("renders all three pet category names", () => {
        renderHome();
        expect(screen.getByText("Cats")).toBeInTheDocument();
        expect(screen.getByText("Dogs")).toBeInTheDocument();
        expect(screen.getByText("Birds")).toBeInTheDocument();
    });

    test("renders an image for each pet category with correct alt text", () => {
        renderHome();
        expect(screen.getByAltText("Cats")).toBeInTheDocument();
        expect(screen.getByAltText("Dogs")).toBeInTheDocument();
        expect(screen.getByAltText("Birds")).toBeInTheDocument();
    });

    test("clicking 'Cats' navigates to /CatList", () => {
        renderHome();
        fireEvent.click(screen.getByText("Cats"));
        expect(mockNavigate).toHaveBeenCalledWith("/CatList");
    });

    test("clicking 'Dogs' navigates to /DogList", () => {
        renderHome();
        fireEvent.click(screen.getByText("Dogs"));
        expect(mockNavigate).toHaveBeenCalledWith("/DogList");
    });

    test("clicking 'Birds' navigates to /BirdList", () => {
        renderHome();
        fireEvent.click(screen.getByText("Birds"));
        expect(mockNavigate).toHaveBeenCalledWith("/BirdList");
    });
});

// ─────────────────────────────────────────────
// INFO / DESCRIPTION SECTION
// ─────────────────────────────────────────────
describe("Info Section", () => {
    test("renders the companion tagline", () => {
        renderHome();
        expect(
            screen.getByText(/your perfect companion is waiting/i)
        ).toBeInTheDocument();
    });

    test("renders the platform description text", () => {
        renderHome();
        expect(
            screen.getByText(/PetMatch is a technology platform/i)
        ).toBeInTheDocument();
    });
});

// ─────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────
describe("Footer", () => {
    test("renders the copyright notice", () => {
        renderHome();
        expect(
            screen.getByText(/© 2026 PETMATCH. All rights reserved./i)
        ).toBeInTheDocument();
    });

    test("renders contact information", () => {
        renderHome();
        expect(screen.getByText("Muscat, Oman")).toBeInTheDocument();
        expect(screen.getByText("petmatch@gmail.com")).toBeInTheDocument();
        expect(screen.getByText("+968 9999 9999")).toBeInTheDocument();
    });

    test("renders Quick Links section", () => {
        renderHome();
        expect(screen.getByText("Quick Links")).toBeInTheDocument();
    });

    test("renders Support section", () => {
        renderHome();
        expect(screen.getByText("Support")).toBeInTheDocument();
        expect(screen.getByText("Privacy Policy")).toBeInTheDocument();
        expect(screen.getByText("Terms & Conditions")).toBeInTheDocument();
    });

    test("clicking footer 'Home' quick link navigates to /home", () => {
        renderHome();
        // The footer has a plain <p> with onClick (not a NavLink)
        // There are two "Home" texts (navbar link + footer link); get the last one
        const homeLinks = screen.getAllByText("Home");
        fireEvent.click(homeLinks[homeLinks.length - 1]);
        expect(mockNavigate).toHaveBeenCalledWith("/home");
    });

    test("clicking footer 'About Us' quick link navigates to /about", () => {
        renderHome();
        const aboutLinks = screen.getAllByText("About Us");
        fireEvent.click(aboutLinks[aboutLinks.length - 1]);
        expect(mockNavigate).toHaveBeenCalledWith("/about");
    });

    test("clicking footer 'Contact Us' quick link navigates to /contact", () => {
        renderHome();
        const contactLinks = screen.getAllByText("Contact Us");
        fireEvent.click(contactLinks[contactLinks.length - 1]);
        expect(mockNavigate).toHaveBeenCalledWith("/contact");
    });

    test("'Back to top' button calls window.scrollTo", () => {
        renderHome();
        const scrollToMock = vi.fn();
        window.scrollTo = scrollToMock;

        fireEvent.click(screen.getByText(/back to top/i));
        expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
    });
});
