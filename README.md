//duy đẹp trai
<h1>MUSIC WEBSITE</h1>
<h2>1. Các bước chạy và cài đặt Docker trên hệ điều hành Ubuntu</h2>
<h3>Bước 1: Cập nhật hệ thống</h3>
Tiến hành cập nhật các gói (package) đã được cài đặt trên hệ thống Ubuntu bằng lệnh:

<pre>sudo apt update -y && apt upgrade -y</pre>
    
<h3>Bước 2: Cài đặt Docker</h3>
Để cài đặt bản Docker mới nhất, các  nên cài đặt trực tiếp từ kho lưu trữ của Docker.

Cài đặt một số gói cho phép sử dụng HTTPS.

<pre>sudo apt install apt-transport-https ca-certificates curl software-properties-common</pre>  
    
Thêm khóa GPG của kho lưu trữ Docker.
  
<pre>curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg</pre>
    
Bây giờ hãy thêm kho lưu trữ Docker của Ubuntu 22.04 ( jammy) vào các apt sources.
  
<pre>echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null</pre>
    
Cập nhật packages và thiết lập để cài đặt Docker từ kho lưu trữ chính thức.
  
<pre>sudo apt update</pre>
<pre>sudo apt-cache policy docker-ce</pre>
    
![update Package](https://azdigi.com/blog/wp-content/uploads/2022/05/CleanShot-2022-05-14-at-14.58.10.png)    
Cài đặt Docker
  
<pre>sudo apt install docker-ce -y</pre>

![setting Docker](https://azdigi.com/blog/wp-content/uploads/2022/05/CleanShot-2022-05-14-at-14.59.43.png) 
    
Kiểm tra trạng thái của Docker
 
<pre>sudo systemctl status docker</pre>

![Check status docker](https://azdigi.com/blog/wp-content/uploads/2022/05/CleanShot-2022-05-14-at-15.00.28.png)
    
<h3>Bước 3: Cấu hình quyền Sudo cho user sử dụng Docker</h3>
Các Docker yêu cầu chỉ được thực thi với tư cách người dùng root theo mặc định. Do đó nếu các  sử dụng các user khác thì cần phải thêm user đó vào nhóm Docker thì mới có quyền thao tác.

<pre>sudo usermod -aG docker username  (Nhớ thay username bằng user của )</pre>
    
<h3>Bước 4: Sử dụng lệnh Docker để build container</h3>
Để xem các thông tin về Docker

<pre>docker info</pre>

![Check infor](https://azdigi.com/blog/wp-content/uploads/2022/05/CleanShot-2022-05-14-at-15.08.38.png)
    
Build Docker image
  
<pre>docker build . -t [tên tag image] </pre>

![](image_tutorial/342354139_202118322584951_1834945296942003401_n.png)

Để xem các image đã build

<pre>docker image ls</pre>

![](image_tutorial/342490521_217933580975154_883109246959707632_n.png)

Để chạy image đã build 

<pre>docker run -itd -p [Cổng của dự án expose ra]:[cổng ánh xạ đến container] [name:tag] </pre>

![](image_tutorial/342713892_985541185939922_1262460989242421033_n.png)

Để check container đang chạy 

<pre>docker ps</pre>

![](image_tutorial/344371889_247758604446759_341631157296807510_n.png)

Để kiểm tra logs trong quá trình chạy container 

<pre>docker logs <image ID></pre>

![](image_tutorial/342405361_176037032056786_2077710370705631803_n.png)


<h2>2. Phân chia công việc</h2>

1. Trần Quang Thắng (tester and coder)
2. Nguyễn Việt Hòa (owner and coder)
3. Vũ Đức Duy (coder)
4. Bùi Trung Kiên (coder and leader pro)

<h2>3. Cài đặt và triển khai CI/CD sử dụng gitlab và docker</h2>

<body>
<ul>– Bước 1: [Manual] Khởi tạo repository và có branch default là main và dev. Cài đặt trên Gitlab 9.</ul>
<ul>– Bước 2: [Manual] Trừ owner(Nguyễn Việt Hòa) ra, thì các coder sẽ push code tính năng lên branch dev.</ul>
<ul>– Bước 3: [Auto] Hệ thống tự động thực hiện test source code, nếu PASS thì sẽ deploy tự động (rsync) code lên server beta.</ul>
<ul>– Bước 4: [Manual] Tester sẽ vào hệ thống beta để làm UAT (User Acceptance Testing) và confirm là mọi thứ OK.</ul>
<ul>– Bước 5: [Manual] Coder hoặc owner sẽ vào tạo Merge Request, và merge từ branch dev sang branch master.</ul>
<ul>– Bước 6: [Manual] Owner sẽ accept merge request.</ul>
<ul>– Bước 7: [Auto] Hệ thống sẽ tự động thực hiện test source code, nếu PASS sẽ enable tính năng cho phép deploy lên production server.</ul>
<ul>– Bước 8: [Manual] Owner review là merge request OK, test OK. Tiến hành nhấn nút để deploy các thay đổi lên môi trường production.</ul>
<ul>– Bước 9: [Manual] Tester sẽ vào hệ thống production để làm UAT và confirm mọi thứ OK. Nếu không OK, Owner có thể nhấn nút Deploy phiên bản master trước đó để rollback hệ thống về trạng thái stable trước đó.</ul>
</body>