const request = require("supertest");
const ContactMessage = require("../models/ContactMessage");
const app = require("../app");

jest.mock("../models/ContactMessage", () => ({
  create: jest.fn(),
}));

const validPayload = {
  fullName: "  Amara Okafor  ",
  email: "  amara@example.com  ",
  phone: "  +44 7000 000 000  ",
  message: "  I would like help choosing a protective style.  ",
};

describe("contact API", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("saves a valid trimmed contact message with new status", async () => {
    ContactMessage.create.mockResolvedValue({ _id: "contact-1" });

    const response = await request(app).post("/api/contact").send(validPayload);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      success: true,
      message: "Your message has been received.",
    });
    expect(ContactMessage.create).toHaveBeenCalledWith({
      fullName: "Amara Okafor",
      email: "amara@example.com",
      phone: "+44 7000 000 000",
      message: "I would like help choosing a protective style.",
      status: "new",
    });
  });

  it("returns 400 when required fields are missing", async () => {
    const response = await request(app).post("/api/contact").send({
      fullName: "Amara Okafor",
      email: "amara@example.com",
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/phone/i);
    expect(ContactMessage.create).not.toHaveBeenCalled();
  });

  it("returns 400 when email format is invalid", async () => {
    const response = await request(app)
      .post("/api/contact")
      .send({ ...validPayload, email: "not-an-email" });

    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/email/i);
    expect(ContactMessage.create).not.toHaveBeenCalled();
  });

  it("returns 400 when a required field only contains whitespace", async () => {
    const response = await request(app)
      .post("/api/contact")
      .send({ ...validPayload, message: "   " });

    expect(response.status).toBe(400);
    expect(response.body.message).toMatch(/message/i);
    expect(ContactMessage.create).not.toHaveBeenCalled();
  });

  it("returns a safe 500 response when persistence fails", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    ContactMessage.create.mockRejectedValue(new Error("database credentials leaked"));

    const response = await request(app).post("/api/contact").send(validPayload);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: "Something went wrong" });
    expect(response.text).not.toMatch(/credentials/i);
    consoleSpy.mockRestore();
  });
});
