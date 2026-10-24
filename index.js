// Dữ liệu khởi tạo
let bookings = [
  {
    bookingCode: "CIN-001",
    customerName: "Nguyễn Văn An",
    movieTitle: "Ánh Trăng Cuối Phố",
    ticketCount: 2,
    pricePerTicket: 90000,
    totalAmount: 194400,
  },
  {
    bookingCode: "CIN-003",
    customerName: "Lê Minh Châu",
    movieTitle: "Mùa Hè Rực Lửa",
    ticketCount: 6,
    pricePerTicket: 110000,
    totalAmount: 641520,
  },
];

//FR-01 - Hiển thị danh sách đơn đặt vé
const displayBookings = (list) => {
  if (!list || list.length === 0) {
    console.log("Danh sách đơn đặt vé trống");
    return;
  }

  let totalRevenvue = 0;
  list.forEach((element, index) => {
    totalRevenvue += element.totalAmount;
    console.log(`
${index + 1}. ${element.bookingCode} - ${element.customerName} - ${element.movieTitle}
SL: ${element.ticketCount} - Giá: ${element.pricePerTicket} - Tổng TT: ${element.totalAmount}
            `);
  });

  console.log(`Tổng: ${list.length} đơn đặt vé – Doanh thu: ${totalRevenvue}`);
};

//Hàm formatName
const formatName = (name) => {
  if (!name) {
    return "";
  }

  let trimed = name.trim();

  //biến đổi chuỗi thành mảng và truy cập vào từng phần tử trong mảng và biến đổi ký tự đầu thảnh In Hoa
  let words = trimed.split(" ").filter((word) => word !== "");

  let capitalizeWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  //biến đổi mảng thành chuỗi
  return capitalizeWords.join(" ");
};

//Hàm kiểm tra mã tồn tại hay ch
const findBookingCode = (bookingCode) => {
  if (!bookingCode) {
    return -1;
  }
  for (let i = 0; i < bookings.length; i++) {
    if (bookings[i].bookingCode === bookingCode) {
      return i;
    }
  }
  return -1;
};

//Hàm KT mã đặt vé
const validateBookingCode = (bookingCode) => {
  if (!bookingCode) {
    return "Hủy thao tác";
  }

  let upperCode = bookingCode.trim().toUpperCase();

  if (upperCode === "") {
    return "Lỗi: chưa nhập mã đặt vé";
  }

  if (upperCode.length < 6) {
    return "Lỗi: độ dài nhỏ hơn 6 ký tự";
  }

  if (!upperCode.startsWith("CIN-")) {
    return `Lỗi: Sai tiền tố "CIN-"`;
  }

  if (upperCode.includes(" ")) {
    return "Lỗi: Chứa khoảng trắng";
  }

  if (findBookingCode(upperCode) !== -1) {
    return "Lỗi: Mã đã tồn tại";
  }

  return "";
};

//hàm yêu cầu nhập đến khi đúng
const inputPositiveInteger = (message) => {
  while (true) {
    let input = prompt(message);

    if (input === null) {
      return null;
    }
    let trimed = input.trim();

    if (trimed === "") {
      alert("Vui lòng không để trống");
    }
    let number = +trimed;

    //KT có phải số và lớn hơn 0
    if (Number.isInteger(number) && number > 0) {
      return number;
    }
    alert("Vui lòng nhập số nguyên lớn hơn 0");
  }
};

const inputNonEmptyString = (message) => {
  while (true) {
    let input = prompt(message);
    if (input === null) return null;
    if (input.trim() !== "") return input.trim();
    alert("Dữ liệu không được để trống, vui lòng nhập lại!");
  }
};

const calculateTotal = (ticketCount, pricePerTicket) => {
  let baseCost = ticketCount * pricePerTicket;
  let discount = ticketCount >= 4 ? Math.round(baseCost * 0.1) : 0;
  let serviceFee = Math.round((baseCost - discount) * 0.08);
  let totalAmount = baseCost - discount + serviceFee;

  return { baseCost, discount, serviceFee, totalAmount };
};

//FR-02 - Thêm đơn vé mới
const handleCreateBooking = () => {
  let rawCode = prompt("Nhập mã đặt vé");
  if (rawCode === null) {
    console.log("Đã hủy thao tác");
    return;
  }

  let validateError = validateBookingCode(rawCode);
  if (validateError !== "") {
    console.log(validateError);
    return;
  }

  let bookingCode = rawCode.trim().toUpperCase();

  let rawName = inputNonEmptyString("Nhập tên khách hàng:");
  if (rawName === null) {
    console.log("Đã hủy thao tác");
    return;
  }

  let customerName = formatName(rawName);

  let rawMovie = inputNonEmptyString("Nhập tên phim:");
  if (rawMovie === null) {
    console.log("Đã hủy thao tác");
    return;
  }
  let movieTitle = formatName(rawMovie);

  let ticketCount = inputPositiveInteger("Nhập số vé:");
  if (ticketCount === null) {
    console.log("Đã hủy thao tác");
    return;
  }

  let pricePerTicket = inputPositiveInteger("Nhập giá mỗi vé:");
  if (pricePerTicket === null) {
    console.log("Đã hủy thao tác");
    return;
  }

  let calc = calculateTotal(ticketCount, pricePerTicket);

  let newBooking = {
    bookingCode,
    customerName,
    movieTitle,
    ticketCount,
    pricePerTicket,
    totalAmount: calc.totalAmount,
  };

  bookings.push(newBooking);

  console.log(`
----- HÓA ĐƠN ĐẶT VÉ MỚI -----
Mã đặt vé: ${newBooking.bookingCode}
Khách hàng: ${newBooking.customerName}
Tên phim: ${newBooking.movieTitle}
Số vé: ${newBooking.ticketCount}
Giá mỗi vé: ${newBooking.pricePerTicket}
Chi phí cơ sở: ${calc.baseCost}
Giảm giá: ${calc.discount}
Phí dịch vụ: ${calc.serviceFee}
Tổng thanh toán: ${newBooking.totalAmount}
  `);
};

//FR-03 - Cập nhật
const handleUpdateBooking = () => {
  let code = prompt("Nhập mã vé cần cập nhật: ");
  if (code === null) {
    console.log("Đã hủy cập nhật");
    return;
  }

  let cleanCode = code.trim().toUpperCase();
  let index = findBookingCode(cleanCode);

  if (index === -1) {
    console.log(`Không tìm thấy đơn đặt vé có mã ${cleanCode}`);
    return;
  }

  // Khai báo current và lưu lại oldTotal trước khi sửa
  const current = bookings[index];
  const oldTotal = current.totalAmount;

  let newCount = inputPositiveInteger(
    `Nhập số vé mới (hiện tại: ${current.ticketCount}):`,
  );
  if (newCount === null) {
    console.log("Đã hủy cập nhật");
    return;
  }

  let newPrice = inputPositiveInteger(
    `Nhập giá mới (hiện tại: ${current.pricePerTicket}):`,
  );
  if (newPrice === null) {
    console.log("Đã hủy cập nhật");
    return;
  }

  let calc = calculateTotal(newCount, newPrice);

  bookings[index].ticketCount = newCount;
  bookings[index].pricePerTicket = newPrice;
  bookings[index].totalAmount = calc.totalAmount;

  console.log("Cập nhật thành công");
  console.log(
    `Tổng TT cũ: ${oldTotal} | Tổng TT mới: ${bookings[index].totalAmount}`,
  );
};

//FR-04 - Xóa
const handleDeleteBooking = () => {
  let code = prompt("Nhập mã đặt vé cần xóa:");
  if (code === null) {
    console.log("Đã hủy thao tác xóa");
    return;
  }

  let cleanCode = code.trim().toUpperCase();
  let index = findBookingCode(cleanCode);

  if (index === -1) {
    console.log(`Không tìm thấy đơn đặt vé có mã ${cleanCode}`);
    return;
  }

  let confirmChoice = prompt(
    `Bạn có chắc chắn muốn xóa mã ${cleanCode}? (Y/N):`,
  );
  if (confirmChoice !== null && confirmChoice.trim().toUpperCase() === "Y") {
    bookings.splice(index, 1);
    console.log(`Xóa thành công, còn ${bookings.length} đơn`);
  } else {
    console.log(`Đã hủy thao tác xóa, còn ${bookings.length} đơn`);
  }
};

//FR-05 - Tìm kiếm
const handleSearchBooking = () => {
  let keyword = prompt("Nhập từ khóa tên phim cần tìm kiếm:");
  if (keyword === null || keyword.trim() === "") {
    console.log("Chưa nhập từ khóa tìm kiếm");
    return;
  }

  let cleanKeyword = keyword.trim().toLowerCase();
  let filtered = bookings.filter((item) =>
    item.movieTitle.toLowerCase().includes(cleanKeyword),
  );

  if (filtered.length === 0) {
    console.log("Không tìm thấy đơn đặt vé phù hợp");
    return;
  }

  displayBookings(filtered);
};

const main = () => {
  let choice = "";

  do {
    choice = prompt(`
===============================
HỆ THỐNG QUẢN LÝ ĐẶT VÉ MOONLIGHT CINEMA
===============================
1. Hiển thị danh sách đơn đặt vé
2. Thêm đơn đặt vé mới
3. Cập nhật đơn đặt vé
4. Xóa đơn đặt vé
5. Tìm kiếm đơn đặt vé theo tên phim
0. Thoát chương trình
===============================
Vui lòng nhập lựa chọn của bạn (0 - 5):
        `);

    if (choice === null) {
      alert("Thoát chương trình!");
      return;
    }

    switch (choice) {
      case "1":
        displayBookings(bookings);
        break;

      case "2":
        handleCreateBooking();
        break;

      case "3":
        handleUpdateBooking();
        break;

      case "4":
        handleDeleteBooking();
        break;

      case "5":
        handleSearchBooking();
        break;

      case "0":
        alert("Thoát chương trình!");
        break;
      default:
        alert("Lựa chọn không hợp lệ!");
        break;
    }
  } while (choice !== "0");
};

main();
