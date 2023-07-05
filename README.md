<h1>FILM WEBSITE</h1>
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

1. Trần Quang Thắng (Code phần giao diện client viết báo cáo và hoàn thiện thiết kế hệ thống) --- role: Thành viên
2. Nguyễn Việt Hòa (Code và thiết kế phần giao diện client) --- role: Thành viên
3. Vũ Đức Duy (Code, thiết kế và triển khai phần giao diện admin page) --- role: Thành viên
4. Bùi Trung Kiên (Hỗ trợ triển khai và code phần giao diện admin page, code các service, phụ trách ghép backend vs frontend API, thiết kế cơ sở dũ liệu và phần backend) --- role: Leader

<h2>3. Cài đặt và triển khai CI/CD sử dụng jenkin và docker</h2>

<li>– Bước 1: [Manual] Khởi tạo repository và có branch default là main và dev. Cài đặt trên Gitlab 9.</li>
<li>– Bước 2: [Manual] Trừ owner(Nguyễn Việt Hòa) ra, thì các coder sẽ push code tính năng lên branch dev.</li>
<li>– Bước 3: [Auto] Hệ thống tự động thực hiện test source code, nếu PASS thì sẽ deploy tự động (rsync) code lên server beta.</li>
<li>– Bước 4: [Manual] Tester sẽ vào hệ thống beta để làm UAT (User Acceptance Testing) và confirm là mọi thứ OK.</li>
<li?>– Bước 5: [Manual] Coder hoặc owner sẽ vào tạo Merge Request, và merge từ branch dev sang branch master.</li>
<li>– Bước 6: [Manual] Owner sẽ accept merge request.</li>
<li?>– Bước 7: [Auto] Hệ thống sẽ tự động thực hiện test source code, nếu PASS sẽ enable tính năng cho phép deploy lên production server.</li>
<li>– Bước 8: [Manual] Owner review là merge request OK, test OK. Tiến hành nhấn nút để deploy các thay đổi lên môi trường production.</li>
<li>– Bước 9: [Manual] Tester sẽ vào hệ thống production để làm UAT và confirm mọi thứ OK. Nếu không OK, Owner có thể nhấn nút Deploy phiên bản master trước đó để rollback hệ thống về trạng thái stable trước đó.</li>

<h2>4. Cài đặt Github Actions để tự động hoá việc kiểm thử</h2>
Để sử dụng GitHub Actions để tự động hóa việc kiểm thử (automation testing) trong dự án , ta tuân theo các bước sau:

<ul>Bước 1: Tạo file cấu hình cho GitHub Actions
    <li>Trong thư mục gốc của dự án, tạo một thư mục mới có tên .github/workflows.</li>
    <li>Trong thư mục .github/workflows, tạo một file YAML mới với tên tùy ý (ví dụ: automation-test.yml).</li>
</ul>

<ul>Bước 2: Cấu hình các bước của GitHub Actions
    <li>Mở file YAML đã tạo ở Bước 1 và sử dụng cú pháp YAML để cấu hình các bước của quy trình (workflow).</li>
    <li>Có thể bắt đầu bằng việc định nghĩa tên của quy trình và sự kiện kích hoạt (trigger event). Ví dụ:</li>

<pre>
stages:          # List of stages for jobs, and their order of execution
  - build
  - test
  - deploy

build-job:       # This job runs in the build stage, which runs first.
  stage: build
  script:
    - echo "Compiling the code..."
    - echo "Compile complete."

unit-test-job:   # This job runs in the test stage.
  stage: test    # It only starts when the job in the build stage completes successfully.
  script:
    - echo "Running unit tests... This will take about 60 seconds."
    - sleep 60
    - echo "Code coverage is 90%"

lint-test-job:   # This job also runs in the test stage.
  stage: test    # It can run at the same time as unit-test-job (in parallel).
  script:
    - echo "Linting code... This will take about 10 seconds."
    - sleep 10
    - echo "No lint issues found."

deploy-job:      # This job runs in the deploy stage.
  stage: deploy  # It only runs when *both* jobs in the test stage complete successfully.
  environment: production
  script:
    - echo "Deploying application..."
    - echo "Application successfully deployed."
</pre>
</ul>

<ul>Bước 3: Commit và đẩy cấu hình lên GitHub
        <li>Lưu file YAML đã tạo.</li>
        <li>Sử dụng Git để commit và đẩy cấu hình lên repository trên GitHub.</li>
</ul>

<ul>Bước 4: Xem kết quả
        <li>Khi cấu hình được đẩy lên GitHub, GitHub Actions sẽ tự động bắt đầu quy trình (workflow) dựa trên sự kiện kích hoạt đã định nghĩa.</li>
        <li>Kết quả của các bước trong quy trình sẽ được hiển thị trong tab "Actions" trên trang repository .</li>
</ul>