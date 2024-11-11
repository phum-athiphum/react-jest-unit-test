import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserProfile from "./userProfile";

global.fetch = jest.fn();

describe("UserProfile Component", () => {

    //  mock ข้อมูล user
  const mockUserId = "1";
  const mockUserData = { name: "Phum Athiphum", email: "athiphumm@gmail.com" };
  const mockError = "Failed to fetch user data";

    // clear ข้อมูล user mock หลังจาก test เสร็จ
  afterEach(() => {
    jest.clearAllMocks();
  });



        // เช๊คว่าตอน initial page มี text Loading แสดงไหม
  test("the loading message should display when page initial", () => {
    render(<UserProfile userId={mockUserId} />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

// ในกรณีที่เราให้ api fetch สําเร็จหลังจากนั้นเรา mocl ให้ response ที่ได้คือ ตัว mockUserData แล้ว 
  test("the user data  name and email should display when fetch success", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUserData,
    });

    render(<UserProfile userId={mockUserId} />);


    await screen.findByText(mockUserData.name);

    expect(
      screen.getByText(`Email: ${mockUserData.email}`)
    ).toBeInTheDocument();
  });


// ในกรฯีเราให้ api fetch ไม่่สําเร็จหลังจากนั้นเราควร เช๊คว่ามี Error Message ขึ้นมาตามที่เรา mock ไหม
  test("the error message should display  when fetch fails", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    render(<UserProfile userId={mockUserId} />);

    await screen.findByText(`Error: ${mockError}`);
  });
});
