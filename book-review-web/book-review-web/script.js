const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const closeLoginModal = document.getElementById('closeLoginModal');
const closeRegisterModal = document.getElementById('closeRegisterModal');
const switchToRegister = document.getElementById('switchToRegister');
const switchToLogin = document.getElementById('switchToLogin');
const userMenu = document.getElementById('userMenu');
const logoutBtn = document.getElementById('logoutBtn');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const charCount = document.getElementById('charCount');
const commentInput = document.getElementById('comment');
const commentError = document.getElementById('commentError');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});


const books = [
    {
        id: 1,
        title: 'Dune (1965)',
        author: 'Frank Herbert',
        publisher: 'Ace Books',
        description: 'Dune là một kiệt tác khoa học viễn tưởng, được xem là một trong những tiểu thuyết vĩ đại nhất của thể loại này. Lấy bối cảnh trên hành tinh sa mạc Arrakis, nơi sản xuất "gia vị" melange – một chất có giá trị vượt trội giúp kéo dài tuổi thọ, nâng cao nhận thức và hỗ trợ du hành vũ trụ – câu chuyện xoay quanh Paul Atreides, người thừa kế trẻ tuổi của gia tộc Atreides. Gia đình Paul bị cuốn vào một âm mưu chính trị phức tạp khi chuyển đến Arrakis, nơi họ phải đối mặt với các thế lực thù địch như gia tộc Harkonnen và các âm mưu tôn giáo sâu xa. Herbert xây dựng một vũ trụ chi tiết với các yếu tố sinh thái học, tôn giáo, và triết lý, tạo nên một thế giới phong phú và sống động. Dune không chỉ là câu chuyện về quyền lực và số phận mà còn là một bài học về môi trường và sự cân bằng của hệ sinh thái. Với phong cách viết đầy hình ảnh và tầng ý nghĩa sâu sắc, cuốn sách đã truyền cảm hứng cho nhiều tác phẩm khoa học viễn tưởng sau này, từ phim ảnh đến trò chơi điện tử.',
        image: 'a1/1.jpg',
        genres: ['international', 'fantasy'],
    },
    {
        id: 2,
        title: '1984 (1949)',
        author: 'George Orwell',
        publisher: 'Penguin',
        description: '1984 là một tiểu thuyết dystopia mang tính biểu tượng, mô tả một thế giới bị thống trị bởi chế độ toàn trị của Đảng, dưới sự lãnh đạo của nhân vật bí ẩn Big Brother. Nhân vật chính, Winston Smith, làm việc tại Bộ Sự Thật, nơi anh chỉnh sửa lịch sử để phù hợp với tuyên truyền của Đảng. Trong xã hội này, mọi hành vi, suy nghĩ và cảm xúc của con người đều bị giám sát chặt chẽ thông qua các thiết bị "telescreen" và lực lượng Cảnh sát Tư tưởng. Orwell khám phá các chủ đề như sự thao túng thông tin, mất tự do cá nhân, và sự kiểm soát tâm lý. Với ngôn ngữ sắc sảo và tầm nhìn đáng sợ, 1984 cảnh báo về những nguy cơ của chủ nghĩa độc tài và sự xâm phạm quyền riêng tư. Tác phẩm đã để lại dấu ấn sâu đậm trong văn hóa đại chúng, với các khái niệm như "Big Brother" và "Orwellian" trở thành thuật ngữ quen thuộc để mô tả sự giám sát và kiểm soát quá mức.',
        image: 'a1/2.jpg',
        genres: ['international', 'novel'],
    },
    {
        id: 3,
        title: 'Pride and Prejudice (1813)',
        author: 'Jane Austen',
        publisher: 'T. Egerton',
        description: 'Kiêu Hãnh và Định Kiến là một tiểu thuyết lãng mạn kinh điển, được yêu thích qua nhiều thế kỷ nhờ lối viết sắc sảo và các nhân vật sống động. Câu chuyện theo chân Elizabeth Bennet, một cô gái thông minh, độc lập, và không ngại thách thức các quy tắc xã hội. Khi gia đình Bennet đối mặt với áp lực tài chính và xã hội, Elizabeth gặp Fitzwilliam Darcy, một quý ông giàu có nhưng ban đầu tỏ ra kiêu ngạo và xa cách. Qua những hiểu lầm, xung đột và sự trưởng thành, hai người dần khám phá tình yêu và sự tôn trọng lẫn nhau. Austen sử dụng sự hài hước và mỉa mai để phê phán xã hội Anh thế kỷ 19, đặc biệt là các chuẩn mực về hôn nhân, giai cấp và vai trò của phụ nữ. Pride and Prejudice không chỉ là một câu chuyện tình yêu mà còn là một bức tranh xã hội sắc nét, khiến nó trở thành một tác phẩm vượt thời gian, được chuyển thể thành phim, kịch và sách giáo khoa trên toàn thế giới.',
        image: 'a1/3.jpg',
        genres: ['international', 'novel'],
    },
    {
        id: 4,
        title: 'The Hobbit (1937)',
        author: 'J.R.R. Tolkien',
        publisher: 'Allen & Unwin',
        description: 'The Hobbit là một tiểu thuyết giả tưởng ấm áp, ban đầu được viết cho thiếu nhi nhưng đã trở thành một tác phẩm kinh điển cho mọi lứa tuổi. Câu chuyện kể về Bilbo Baggins, một hobbit yêu thích sự thoải mái và ổn định, bị phù thủy Gandalf lôi kéo vào một cuộc phiêu lưu với 13 người lùn do Thorin Oakenshield dẫn đầu. Nhiệm vụ của họ là giành lại kho báu bị rồng Smaug chiếm giữ tại Núi Cô Đơn. Tolkien xây dựng một thế giới Trung Địa đầy màu sắc với các sinh vật như yêu tinh, quái vật đá, và nhện khổng lồ, đồng thời lồng ghép các bài học về lòng dũng cảm, tình bạn và sự hy sinh. Với văn phong kể chuyện lôi cuốn và giàu hình ảnh, The Hobbit là tiền đề cho bộ ba Chúa Nhẫn, mở ra một vũ trụ giả tưởng huyền thoại đã truyền cảm hứng cho nhiều thế hệ độc giả và các tác phẩm nghệ thuật khác.',
        image: 'a1/4.jpg',
        genres: ['international', 'fantasy'],
    },
    {
        id: 5,
        title: 'Sapiens (2011)',
        author: 'Yuval Noah Harari',
        publisher: 'Harper',
        description: 'Sapiens: Lược Sử Loài Người là một tác phẩm phi hư cấu đột phá, cung cấp một cái nhìn toàn diện về lịch sử loài Homo sapiens từ thời kỳ đồ đá đến thời đại công nghệ hiện đại. Yuval Noah Harari chia lịch sử thành ba cuộc cách mạng chính: Cách mạng Nhận thức (khi con người phát triển khả năng tư duy trừu tượng), Cách mạng Nông nghiệp (chuyển từ săn bắt hái lượm sang canh tác), và Cách mạng Khoa học (sự phát triển của công nghệ hiện đại). Cuốn sách khám phá cách các yếu tố như tôn giáo, chủ nghĩa tư bản, và đế quốc đã định hình xã hội loài người, đồng thời đặt câu hỏi về ý nghĩa của sự tiến bộ và hạnh phúc. Với lối viết dễ tiếp cận, thông minh và không kém phần khiêu khích, Harari khiến độc giả suy ngẫm về vị trí của loài người trong vũ trụ và những thách thức trong tương lai. Sapiens đã trở thành một hiện tượng toàn cầu, được dịch ra hàng chục ngôn ngữ và ảnh hưởng lớn đến cách chúng ta hiểu về lịch sử.',
        image: 'a1/5.jpg',
        genres: ['international', 'history'],
    },
    {
        id: 6,
        title: 'To Kill a Mockingbird (1960)',
        author: 'Harper Lee',
        publisher: 'J.B. Lippincott',
        description: 'Giết Con Chim Nhại là một tiểu thuyết kinh điển của văn học Mỹ, lấy bối cảnh tại thị trấn Maycomb, Alabama, trong thời kỳ Đại Suy thoái. Câu chuyện được kể qua góc nhìn của Scout Finch, một cô bé thông minh, khi cô và anh trai Jem chứng kiến cha mình, luật sư Atticus Finch, bảo vệ Tom Robinson, một người da đen bị buộc tội cưỡng hiếp một cách oan uổng. Qua lăng kính của Scout, Harper Lee khám phá các chủ đề như phân biệt chủng tộc, bất công xã hội, và sự mất đi của sự ngây thơ. Atticus, với sự chính trực và lòng trắc ẩn, trở thành biểu tượng của công lý và nhân văn. Cuốn sách được ca ngợi vì văn phong chân thực, cảm xúc sâu sắc và thông điệp mạnh mẽ về đạo đức. To Kill a Mockingbird đã giành giải Pulitzer và trở thành một tác phẩm bắt buộc trong giáo dục, truyền cảm hứng về lòng khoan dung và công bằng.',
        image: 'a1/6.jpg',
        genres: ['international', 'novel'],
    },
    {
        id: 7,
        title: 'The Catcher in the Rye (1951)',
        author: 'J.D. Salinger',
        publisher: 'Little, Brown',
        description: 'Bắt Trẻ Đồng Xanh là một tiểu thuyết mang tính bước ngoặt, kể về hành trình ba ngày của Holden Caulfield, một thiếu niên 16 tuổi bị đuổi học và lang thang ở New York. Qua giọng kể chân thực và đầy cảm xúc, Holden bộc lộ sự chán ghét với sự giả tạo của thế giới người lớn, nỗi đau từ cái chết của em trai, và sự cô đơn trong tâm hồn. Salinger khắc họa tâm lý tuổi trẻ một cách sâu sắc, đặt câu hỏi về bản sắc, ý nghĩa cuộc sống, và sự kết nối giữa con người. Với phong cách viết độc đáo, gần gũi như một cuộc trò chuyện, The Catcher in the Rye đã trở thành biểu tượng của sự nổi loạn tuổi trẻ, ảnh hưởng đến văn học, âm nhạc và văn hóa đại chúng, đặc biệt là trong thế hệ trẻ thập niên 1950-1960.',
        image: 'a1/7.png',
        genres: ['international', 'novel'],
    },
    {
        id: 8,
        title: 'Brave New World (1932)',
        author: 'Aldous Huxley',
        publisher: 'Chatto & Windus',
        description: 'Thế Giới Mới Tươi Đẹp là một tiểu thuyết dystopia tiên đoán, mô tả một xã hội tương lai nơi con người được kiểm soát hoàn toàn thông qua kỹ thuật di truyền, thuốc gây nghiện Soma, và tuyên truyền. Trong thế giới này, mọi người được tạo ra trong phòng thí nghiệm, phân chia thành các giai cấp cố định, và sống một cuộc đời "hạnh phúc" nhưng thiếu tự do và cảm xúc thật. Nhân vật Bernard Marx, Lenina Crowne, và John the Savage đối mặt với sự xung đột giữa bản năng con người và hệ thống áp bức. Huxley sử dụng lối viết sắc sảo để phê phán chủ nghĩa tiêu dùng, sự phụ thuộc vào công nghệ, và sự đánh đổi giữa hạnh phúc và tự do. Tác phẩm này, cùng với 1984, đã định hình thể loại dystopia, đặt ra những câu hỏi sâu sắc về tương lai của nhân loại.',
        image: 'a1/8.jpg',
        genres: ['international', 'novel'],
    },
    {
        id: 9,
        title: 'The Great Gatsby (1925)',
        author: 'F. Scott Fitzgerald',
        publisher: 'Scribner',
        description: 'Đại Gia Gatsby là một tiểu thuyết bi kịch về giấc mơ Mỹ, lấy bối cảnh thời đại Jazz xa hoa của thập niên 1920. Câu chuyện xoay quanh Jay Gatsby, một triệu phú bí ẩn, và tình yêu mãnh liệt nhưng không thể đạt được của anh với Daisy Buchanan, một phụ nữ thuộc giới thượng lưu. Qua giọng kể của Nick Carraway, Fitzgerald miêu tả sự phù phiếm của tầng lớp giàu có, sự trống rỗng của chủ nghĩa vật chất, và những ảo tưởng về tình yêu và thành công. Với văn phong lộng lẫy, giàu hình ảnh và biểu tượng, The Great Gatsby là một bức tranh sắc nét về xã hội Mỹ, đồng thời là một câu chuyện buồn về hy vọng và thất bại. Tác phẩm được coi là một trong những tiểu thuyết vĩ đại nhất của văn học Mỹ.',
        image: 'a2/9.jpg',
        genres: ['international', 'novel'],
    },
    {
        id: 10,
        title: 'Lord of the Rings (1954)',
        author: 'J.R.R. Tolkien',
        publisher: 'Allen & Unwin',
        description: 'Chúa Nhẫn là một sử thi giả tưởng vĩ đại, gồm ba phần: The Fellowship of the Ring, The Two Towers, và The Return of the King. Câu chuyện kể về Frodo Baggins, một hobbit, cùng nhóm bạn trong Nhẫn Hội, trên hành trình phá hủy chiếc Nhẫn Quyền Lực để ngăn chặn chúa tể bóng tối Sauron. Tolkien xây dựng Trung Địa, một thế giới giả tưởng chi tiết với lịch sử, ngôn ngữ, và văn hóa riêng biệt, từ các tộc người như elf, người lùn, đến các sinh vật như orc và Ent. Tác phẩm khám phá các chủ đề như tình bạn, lòng dũng cảm, sự hy sinh, và cám dỗ của quyền lực. Với quy mô hoành tráng và chiều sâu triết lý, Chúa Nhẫn đã định hình thể loại giả tưởng hiện đại và trở thành nguồn cảm hứng cho phim ảnh, trò chơi và văn học.',
        image: 'a2/10.jpg',
        genres: ['international', 'fantasy'],
    },
    {
        id: 11,
        title: 'The Alchemist (1988)',
        author: 'Paulo Coelho',
        publisher: 'HarperCollins',
        description: 'Nhà Giả Kim là một tiểu thuyết triết lý, kể về Santiago, một chàng trai chăn cừu ở Andalusia, Tây Ban Nha, theo đuổi giấc mơ về kho báu tại kim tự tháp Ai Cập. Trên hành trình, anh gặp gỡ những nhân vật như nhà giả kim, người dạy anh về ý nghĩa của "Huyền thoại Cá nhân" – giấc mơ định hình cuộc đời mỗi người. Với lối kể chuyện giản dị nhưng sâu sắc, Coelho lồng ghép các bài học về lòng dũng cảm, niềm tin, và sự kết nối với vũ trụ. The Alchemist đã trở thành một hiện tượng toàn cầu, được dịch ra hơn 80 ngôn ngữ, truyền cảm hứng cho hàng triệu độc giả về việc theo đuổi ước mơ và lắng nghe trái tim.',
        image: 'a2/11.jpg',
        genres: ['international', 'self-help'],
    },
    {
        id: 12,
        title: 'Harry Potter (1997)',
        author: 'J.K. Rowling',
        publisher: 'Bloomsbury',
        description: 'Loạt truyện Harry Potter gồm bảy cuốn, kể về hành trình của Harry Potter, một cậu bé phù thủy, cùng bạn bè Ron Weasley và Hermione Granger tại trường Hogwarts. Từ khi phát hiện mình là phù thủy, Harry đối mặt với Chúa tể Hắc ám Voldemort, kẻ đã giết cha mẹ anh. Rowling xây dựng một thế giới phép thuật sống động với các chi tiết như đũa thần, trận Quidditch, và các sinh vật huyền bí. Bộ truyện khám phá các chủ đề như tình bạn, lòng trung thành, sự trưởng thành, và cuộc chiến giữa thiện và ác. Với sức hút toàn cầu, Harry Potter đã trở thành một hiện tượng văn hóa, truyền cảm hứng cho phim, công viên giải trí, và cộng đồng người hâm mộ rộng lớn.',
        image: 'a2/12.jpg',
        genres: ['international', 'fantasy'],
    },
    {
        id: 13,
        title: 'Educated (2018)',
        author: 'Tara Westover',
        publisher: 'Random House',
        description: 'Educated là hồi ký cảm động của Tara Westover, kể về hành trình vượt qua tuổi thơ khắc nghiệt trong một gia đình Mormon bảo thủ ở Idaho. Không được đi học chính quy, Tara lớn lên trong môi trường bị kiểm soát bởi người cha cực đoan, người tin rằng giáo dục và y học hiện đại là không cần thiết. Bằng sự tò mò và quyết tâm, Tara tự học để thi đỗ đại học, cuối cùng giành học bổng tại Cambridge và Harvard. Cuốn sách là câu chuyện về sự đấu tranh với gia đình, niềm tin, và bản sắc, đồng thời là minh chứng cho sức mạnh của giáo dục. Với giọng văn chân thực và cảm xúc, Educated đã chạm đến trái tim độc giả toàn cầu.',
        image: 'a2/13.jpg',
        genres: ['international'],
    },
    {
        id: 14,
        title: 'The Da Vinci Code (2003)',
        author: 'Dan Brown',
        publisher: 'Doubleday',
        description: 'Mật Mã Da Vinci là một tiểu thuyết ly kỳ, theo chân Robert Langdon, một nhà biểu tượng học, và Sophie Neveu, một nhà mật mã học, khi họ điều tra vụ giết người tại bảo tàng Louvre. Cuộc điều tra dẫn họ đến những bí mật liên quan đến Hội Thánh, Chén Thánh, và lịch sử Thiên Chúa giáo. Brown kết hợp nghệ thuật, lịch sử, và tôn giáo vào một câu chuyện đầy kịch tính, với các manh mối ẩn trong các tác phẩm của Leonardo da Vinci. Dù gây tranh cãi vì nội dung tôn giáo, cuốn sách đã trở thành một hiện tượng toàn cầu nhờ nhịp điệu nhanh và cốt truyện hấp dẫn, mở đường cho loạt sách về Robert Langdon.',
        image: 'a2/14.jpg',
        genres: ['international', 'novel'],
    },
    {
        id: 15,
        title: 'Becoming (2018)',
        author: 'Michelle Obama',
        publisher: 'Crown',
        description: 'Becoming là hồi ký của cựu Đệ nhất Phu nhân Mỹ Michelle Obama, kể về cuộc đời bà từ tuổi thơ ở Chicago đến vai trò tại Nhà Trắng. Với sự chân thành, bà chia sẻ về những thách thức khi lớn lên trong một gia đình lao động, hành trình học tập tại Princeton và Harvard, và tình yêu với Barack Obama. Cuốn sách cũng tiết lộ những áp lực khi là Đệ nhất Phu nhân da màu đầu tiên của Mỹ, từ việc đối mặt với định kiến đến việc nuôi dạy con cái trong ánh mắt công chúng. Với giọng văn ấm áp và truyền cảm hứng, Becoming là một câu chuyện về sự kiên cường, bản sắc, và hy vọng, thu hút độc giả trên toàn thế giới.',
        image: 'a2/15.jpg',
        genres: ['international'],
    },
    {
        id: 16,
        title: 'Tôi Thấy Hoa Vàng Trên Cỏ Xanh (2010)',
        author: 'Nguyễn Nhật Ánh',
        publisher: 'NXB Trẻ',
        description: 'Tôi Thấy Hoa Vàng Trên Cỏ Xanh là một tiểu thuyết tuổi thơ đầy cảm xúc, kể về Thiều và Tường, hai anh em lớn lên ở một làng quê Việt Nam. Qua những kỷ niệm trong trẻo như chơi đùa, cãi vã, và những rung động đầu đời, Nguyễn Nhật Ánh tái hiện một thế giới tuổi thơ giản dị nhưng đầy ý nghĩa. Cuốn sách khắc họa tình cảm gia đình, tình bạn, và những nỗi buồn nhẹ nhàng của tuổi trẻ. Với văn phong trong trẻo và giàu hình ảnh, tác phẩm gợi lên nỗi nhớ quê hương và trở thành một trong những cuốn sách được yêu thích nhất của Nguyễn Nhật Ánh, được chuyển thể thành phim và sân khấu.',
        image: 'a2/16.jpg',
        genres: ['vietnamese', 'novel'],
    },
    {
        id: 17,
        title: 'Tuổi Trẻ Đáng Giá Bao Nhiêu (2012)',
        author: 'Rosie Nguyễn',
        publisher: 'NXB Hội Nhà Văn',
        description: 'Tuổi Trẻ Đáng Giá Bao Nhiêu là một cuốn sách self-help truyền cảm hứng, hướng đến giới trẻ Việt Nam. Rosie Nguyễn chia sẻ những trải nghiệm cá nhân từ việc học tập, du lịch, và khám phá bản thân, khuyến khích độc giả sống ý nghĩa và tận dụng tuổi trẻ. Cuốn sách cung cấp các bài học thực tế về việc đặt mục tiêu, học hỏi không ngừng, và vượt qua nỗi sợ thất bại. Với giọng văn gần gũi và chân thành, tác phẩm đã trở thành nguồn động lực cho nhiều bạn trẻ Việt Nam, thúc đẩy họ theo đuổi đam mê và xây dựng cuộc sống trọn vẹn.',
        image: 'a3/17.jpg',
        genres: ['vietnamese', 'self-help'],
    },
    {
        id: 18,
        title: 'Mắt Biếc (1990)',
        author: 'Nguyễn Nhật Ánh',
        publisher: 'NXB Trẻ',
        description: 'Mắt Biếc là một tiểu thuyết tình cảm buồn, kể về Ngạn, một chàng trai yêu đơn phương Hà Lan, cô gái có đôi mắt biếc quyến rũ. Lớn lên cùng nhau ở làng quê, Ngạn luôn dành tình cảm sâu đậm cho Hà Lan, nhưng cô lại bị cuốn vào những cám dỗ của thành phố. Với giọng văn thơ mộng và cảm xúc, Nguyễn Nhật Ánh khắc họa nỗi đau của tình yêu không trọn vẹn, sự hy sinh, và những ký ức tuổi trẻ. Mắt Biếc là một trong những tác phẩm nổi tiếng nhất của ông, được yêu thích bởi sự tinh tế và được chuyển thể thành phim thành công.',
        image: 'a3/18.jpg',
        genres: ['vietnamese', 'novel'],
    },
    {
        id: 19,
        title: 'Đất Rừng Phương Nam (1957)',
        author: 'Đoàn Giỏi',
        publisher: 'NXB Kim Đồng',
        description: 'Đất Rừng Phương Nam là một tiểu thuyết phiêu lưu kể về cậu bé An, lang thang ở vùng Nam Bộ trong thời kỳ kháng chiến chống Pháp. Qua hành trình, An khám phá vẻ đẹp thiên nhiên của miền Tây sông nước, từ rừng ngập mặn đến các loài động vật hoang dã, và gặp gỡ những con người hào sảng, nghĩa hiệp. Đoàn Giỏi tái hiện một bức tranh sống động về văn hóa và con người Nam Bộ, lồng ghép các giá trị nhân văn về lòng yêu nước và tình người. Cuốn sách là một tác phẩm kinh điển của văn học Việt Nam, được yêu thích qua nhiều thế hệ và chuyển thể thành phim.',
        image: 'a3/19.jpg',
        genres: ['vietnamese', 'novel'],
    },
    {
        id: 20,
        title: 'The Psychology of Money (2020)',
        author: 'Morgan Housel',
        publisher: 'Harriman House',
        description: 'Tâm Lý Học Về Tiền là một cuốn sách phi hư cấu sâu sắc, phân tích cách con người suy nghĩ và hành xử với tiền bạc. Morgan Housel sử dụng các câu chuyện thực tế để minh họa rằng thành công tài chính không chỉ dựa vào kiến thức mà còn phụ thuộc vào tư duy và thói quen. Cuốn sách nhấn mạnh các nguyên tắc như tiết kiệm, đầu tư dài hạn, và kiểm soát cảm xúc khi đối mặt với rủi ro tài chính. Với lối viết dễ hiểu và hấp dẫn, The Psychology of Money cung cấp những bài học quý giá về cách xây dựng sự giàu có bền vững, phù hợp cho mọi đối tượng độc giả.',
        image: 'a3/20.jpg',
        genres: ['international', 'self-help'],
    },
    {
        id: 21,
        title: 'The Silence of the Lambs (1988)',
        author: 'Thomas Harris',
        publisher: "St. Martin's Press",
        description: 'Sự Im Lặng Của Bầy Cừu là một tiểu thuyết kinh dị ly kỳ, kể về Clarice Starling, một thực tập sinh FBI, hợp tác với Hannibal Lecter, một bác sĩ tâm thần và kẻ ăn thịt người, để truy bắt kẻ giết người hàng loạt Buffalo Bill. Với cốt truyện căng thẳng và nhân vật phức tạp, Harris tạo nên một câu chuyện vừa đáng sợ vừa hấp dẫn. Cuốn sách khám phá tâm lý tội phạm, sự đấu tranh giữa thiện và ác, và sức mạnh của trí tuệ. Được chuyển thể thành phim đoạt giải Oscar, The Silence of the Lambs là một kiệt tác của thể loại kinh dị tâm lý.',
        image: 'a3/21.png',
        genres: ['international', 'novel'],
    },
    {
        id: 22,
        title: 'Think and Grow Rich (1937)',
        author: 'Napoleon Hill',
        publisher: 'The Ralston Society',
        description: 'Nghĩ Giàu và Làm Giàu là một cuốn sách self-help kinh điển, dựa trên nghiên cứu của Napoleon Hill về các triệu phú và doanh nhân thành công. Cuốn sách đưa ra 13 nguyên tắc để đạt được giàu có, từ tư duy tích cực, đặt mục tiêu rõ ràng, đến sự kiên trì và hợp tác. Hill nhấn mạnh rằng thành công bắt nguồn từ tâm trí và niềm tin, không chỉ từ hoàn cảnh. Với những câu chuyện truyền cảm hứng và lời khuyên thực tế, Think and Grow Rich đã ảnh hưởng đến hàng triệu người trên thế giới, trở thành một tác phẩm không thể thiếu trong lĩnh vực phát triển cá nhân.',
        image: 'a3/22.jpg',
        genres: ['international', 'self-help'],
    },
    {
        id: 23,
        title: 'One Piece (1997)',
        author: 'Eiichiro Oda',
        publisher: 'Shueisha',
        description: 'One Piece là một manga phiêu lưu nổi tiếng, kể về Monkey D. Luffy và băng hải tặc Mũ Rơm trên hành trình tìm kho báu One Piece để trở thành Vua Hải Tặc. Với thế giới rộng lớn gồm các đại dương, đảo quốc, và sinh vật kỳ lạ, Oda xây dựng một câu chuyện đầy màu sắc về tình bạn, lòng dũng cảm, và ước mơ. Các nhân vật như Zoro, Nami, và Sanji đều có câu chuyện riêng, làm nổi bật giá trị của sự đoàn kết. Với nghệ thuật sống động và cốt truyện sáng tạo, One Piece là một trong những manga bán chạy nhất mọi thời đại, truyền cảm hứng qua nhiều thế hệ.',
        image: 'a3/23.jpg',
        genres: ['international', 'fantasy'],
    },
    {
        id: 24,
        title: 'Naruto (1999)',
        author: 'Masashi Kishimoto',
        publisher: 'Shueisha',
        description: 'Naruto là một manga shonen kể về Naruto Uzumaki, một ninja trẻ bị cô lập vì mang trong mình con quỷ Cửu Vĩ. Với ước mơ trở thành Hokage – người đứng đầu làng Lá – Naruto vượt qua những thử thách, từ các trận chiến khốc liệt đến những mối quan hệ phức tạp. Manga khám phá các chủ đề như lòng kiên trì, tình bạn, và sự tha thứ, với các nhân vật như Sasuke và Sakura để lại dấu ấn sâu đậm. Với cốt truyện cảm động và hành động mãn nhãn, Naruto đã trở thành một biểu tượng văn hóa, ảnh hưởng đến manga, anime và trò chơi điện tử.',
        image: 'a3/24.jpg',
        genres: ['international', 'fantasy'],
    },
    {
        id: 25,
        title: 'Dragon Ball (1984)',
        author: 'Akira Toriyama',
        publisher: 'Shueisha',
        description: 'Dragon Ball là một manga hành động mang tính cách mạng, kể về Son Goku, một chiến binh Saiyan, trên hành trình bảo vệ Trái Đất và tìm kiếm các viên ngọc rồng. Từ những cuộc phiêu lưu vui nhộn ban đầu, câu chuyện phát triển thành các trận chiến hoành tráng với những kẻ thù mạnh mẽ như Frieza và Cell. Toriyama kết hợp hài hước, hành động, và các giá trị như lòng trung thành và sự phát triển cá nhân. Với thiết kế nhân vật độc đáo và phong cách nghệ thuật năng động, Dragon Ball đã định hình thể loại shonen và trở thành một hiện tượng toàn cầu.',
        image: 'a4/25.jpg',
        genres: ['international', 'fantasy'],
    },
    {
        id: 26,
        title: 'Demon Slayer (2016)',
        author: 'Koyoharu Gotouge',
        publisher: 'Shueisha',
        description: 'Thanh Gươm Diệt Quỷ là một manga cảm động, kể về Tanjiro Kamado, một chàng trai trở thành thợ săn quỷ sau khi gia đình bị tàn sát và em gái Nezuko biến thành quỷ. Với quyết tâm cứu Nezuko và trả thù, Tanjiro gia nhập Đội Diệt Quỷ và đối mặt với những con quỷ mạnh mẽ. Manga nổi bật với nghệ thuật tuyệt đẹp, các trận chiến kịch tính, và câu chuyện về tình cảm gia đình. Demon Slayer đã trở thành một hiện tượng toàn cầu, với anime và phim điện ảnh phá kỷ lục doanh thu.',
        image: 'a4/26.jpg',
        genres: ['international', 'fantasy'],
    },
    {
        id: 27,
        title: 'Attack on Titan (2009)',
        author: 'Hajime Isayama',
        publisher: 'Kodansha',
        description: 'Tấn Công Người Khổng Lồ là một manga dystopia, lấy bối cảnh thế giới nơi nhân loại sống sau những bức tường để tránh các Titan khổng lồ ăn thịt người. Eren Yeager, Mikasa, và Armin tham gia quân đội để chiến đấu và khám phá bí mật về Titan. Với cốt truyện phức tạp, bất ngờ, và các chủ đề như tự do, hy sinh, và bản chất con người, manga này đã thu hút hàng triệu độc giả. Nghệ thuật độc đáo và chiều sâu triết lý của Isayama khiến Attack on Titan trở thành một kiệt tác hiện đại.',
        image: 'a4/27.jpg',
        genres: ['international', 'fantasy'],
    },
    {
        id: 28,
        title: 'Death Note (2003)',
        author: 'Tsugumi Ohba',
        publisher: 'Shueisha',
        description: 'Death Note là một manga ly kỳ tâm lý, kể về Light Yagami, một học sinh xuất sắc tìm thấy cuốn sổ Death Note, cho phép giết người chỉ bằng cách viết tên. Light quyết định dùng nó để tiêu diệt tội phạm, nhưng bị truy đuổi bởi thám tử thiên tài L. Cuốn sách là một trận chiến trí tuệ căng thẳng, khám phá các chủ đề như đạo đức, quyền lực, và công lý. Với cốt truyện thông minh và nhân vật phức tạp, Death Note là một trong những manga nổi tiếng nhất, được chuyển thể thành anime và phim.',
        image: 'a4/28.jpg',
        genres: ['international', 'fantasy'],
    },
    {
        id: 29,
        title: 'Bleach (2001)',
        author: 'Tite Kubo',
        publisher: 'Shueisha',
        description: 'Bleach là một manga shonen kể về Ichigo Kurosaki, một thiếu niên trở thành Shinigami (Thần Chết) để chiến đấu chống lại linh hồn ác và bảo vệ thế giới. Với các trận chiến hoành tráng và thiết kế nhân vật ấn tượng, manga khám phá các chủ đề như lòng trung thành, sự hy sinh, và sức mạnh nội tại. Dù có lúc bị chỉ trích vì cốt truyện kéo dài, Bleach vẫn được yêu thích nhờ phong cách nghệ thuật độc đáo và các nhân vật như Rukia và Aizen.',
        image: 'a4/29.jpg',
        genres: ['international', 'fantasy'],
    },
    {
        id: 30,
        title: 'Tokyo Ghoul (2011)',
        author: 'Sui Ishida',
        publisher: 'Shueisha',
        description: 'Tokyo Ghoul là một manga kinh dị và tâm lý, kể về Ken Kaneki, một sinh viên trở thành nửa người nửa ghoul sau một tai nạn. Anh phải thích nghi với bản chất mới, đối mặt với xã hội ghoul đầy nguy hiểm và xung đột nội tâm về nhân tính. Với nghệ thuật u ám và cốt truyện sâu sắc, manga khám phá các chủ đề như bản sắc, sự cô lập, và ranh giới giữa thiện và ác. Tokyo Ghoul đã trở thành một hiện tượng, được chuyển thể thành anime và để lại dấu ấn trong văn hóa đại chúng.',
        image: 'a4/30.jpg',
        genres: ['international', 'fantasy'],
    },
    {
        id: 31,
        title: 'Detective Conan (1994)',
        author: 'Gosho Aoyama',
        publisher: 'Shogakukan',
        description: 'Thám Tử Lừng Danh Conan là một manga trinh thám nổi tiếng, kể về Shinichi Kudo, một thám tử học sinh bị teo nhỏ thành Conan Edogawa sau khi bị đầu độc. Trong thân hình trẻ con, Conan tiếp tục giải các vụ án phức tạp, từ giết người đến trộm cắp, đồng thời truy tìm tổ chức bí ẩn đứng sau vụ việc của mình. Với cốt truyện thông minh, nhân vật phong phú, và các tình tiết bất ngờ, manga này đã trở thành biểu tượng của thể loại trinh thám, thu hút người hâm mộ qua nhiều thập kỷ.',
        image: 'a4/31.jpg',
        genres: ['international', 'novel'],
    },
    {
        id: 32,
        title: 'Berserk (1989)',
        author: 'Kentaro Miura',
        publisher: 'Hakusensha',
        description: 'Berserk là một manga giả tưởng đen tối, kể về Guts, một kiếm sĩ lang thang, chiến đấu với quái vật và số phận nghiệt ngã sau khi bị phản bội bởi người bạn thân Griffith. Với nghệ thuật chi tiết và cốt truyện sâu sắc, Miura khám phá các chủ đề như bi kịch, trả thù, và ý nghĩa của sự tồn tại. Berserk được ca ngợi vì chiều sâu tâm lý và phong cách nghệ thuật, nhưng cũng gây tranh cãi vì nội dung bạo lực và u ám. Tác phẩm là một kiệt tác của thể loại dark fantasy, ảnh hưởng đến nhiều tác phẩm khác.',
        image: 'a4/32.jpg',
        genres: ['international', 'fantasy'],
    },
    {
        id: 33,
        title: "Man's Search for Meaning (1946)",
        author: 'Viktor E. Frankl',
        publisher: 'Beacon Press',
        description: "Đi Tìm Lẽ Sống là hồi ký và tác phẩm triết lý của Viktor Frankl, kể về trải nghiệm của ông trong các trại tập trung Đức Quốc xã. Qua những đau khổ không thể tưởng tượng, Frankl phát triển lý thuyết logotherapy, nhấn mạnh rằng ý nghĩa cuộc sống là chìa khóa để vượt qua nghịch cảnh. Cuốn sách kết hợp câu chuyện cá nhân với các bài học triết lý, truyền cảm hứng về sự kiên cường và hy vọng. Với giọng văn sâu sắc và nhân văn, Man's Search for Meaning đã trở thành một tác phẩm kinh điển, ảnh hưởng đến tâm lý học và triết học hiện đại.",
        image: 'a5/33.jpg',
        genres: ['international', 'self-help'],
    },
    {
        id: 34,
        title: 'Lịch Sử Thế Giới (1960)',
        author: 'Nguyễn Hiến Lê',
        publisher: 'NXB Tổng Hợp TP.HCM',
        description: 'Lịch Sử Thế Giới là một tác phẩm phi hư cấu của Nguyễn Hiến Lê, tóm tắt lịch sử nhân loại từ thời cổ đại đến hiện đại. Cuốn sách bao quát các nền văn minh lớn như Ai Cập, Hy Lạp, La Mã, và các sự kiện quan trọng như các cuộc chiến tranh, cách mạng, và phát triển văn hóa. Với lối viết dễ hiểu và thông tin phong phú, Nguyễn Hiến Lê mang đến một tài liệu tham khảo quý giá, giúp độc giả Việt Nam hiểu rõ hơn về sự phát triển của thế giới. Tác phẩm là một cống hiến lớn cho giáo dục và văn hóa Việt Nam.',
        image: 'a5/34.jpg',
        genres: ['vietnamese', 'history'],
    },
    {
        id: 35,
        title: 'Lịch Sử Việt Nam (2017)',
        author: 'Viện Sử học Việt Nam',
        publisher: 'NXB Khoa Học Xã Hội',
        description: 'Lịch Sử Việt Nam là một tài liệu chi tiết, được biên soạn bởi Viện Sử học Việt Nam, cung cấp cái nhìn toàn diện về lịch sử dân tộc từ thời kỳ dựng nước đến hiện đại. Cuốn sách bao quát các triều đại, cuộc chiến tranh, và sự phát triển văn hóa, chính trị, kinh tế của Việt Nam. Với nghiên cứu sâu rộng và dữ liệu đáng tin cậy, tác phẩm là nguồn tham khảo quan trọng cho học sinh, sinh viên và những ai quan tâm đến lịch sử Việt Nam. Cuốn sách góp phần khơi dậy lòng tự hào dân tộc và hiểu biết về cội nguồn.',
        image: 'a5/35.jpg',
        genres: ['vietnamese', 'history'],
    },
    {
        id: 36,
        title: 'The Universe in a Nutshell (2001)',
        author: 'Stephen Hawking',
        publisher: 'Bantam Books',
        description: 'Vũ Trụ Trong Vỏ Hạt là một cuốn sách khoa học phổ thông, trong đó Stephen Hawking giải thích các khái niệm vật lý phức tạp như hố đen, lý thuyết dây, và bản chất của thời gian một cách dễ hiểu. Với hình minh họa sinh động và ngôn ngữ rõ ràng, Hawking đưa độc giả vào hành trình khám phá vũ trụ, từ Big Bang đến các chiều không gian. Cuốn sách không chỉ cung cấp kiến thức khoa học mà còn khơi gợi sự tò mò về vị trí của con người trong vũ trụ. Tác phẩm là một trong những đóng góp lớn của Hawking cho việc phổ biến khoa học.',
        image: 'a5/36.png',
        genres: ['international', 'science'],
    },
    {
        id: 37,
        title: 'The Grand Design (2010)',
        author: 'Stephen Hawking',
        publisher: 'Bantam Books',
        description: 'Thiết Kế Vĩ Đại, viết cùng Leonard Mlodinow, khám phá các câu hỏi lớn về nguồn gốc vũ trụ và sự tồn tại của chúng ta. Hawking lập luận rằng vũ trụ có thể tự hình thành dựa trên các quy luật vật lý, không cần đến một thực thể siêu nhiên. Cuốn sách kết hợp vật lý hiện đại, như lý thuyết M, với các khái niệm triết học, được trình bày qua ngôn ngữ dễ tiếp cận và hình minh họa sinh động. The Grand Design là một tác phẩm kích thích tư duy, khuyến khích độc giả suy ngẫm về khoa học và vũ trụ.',
        image: 'a5/37.jpg',
        genres: ['international', 'science'],
    },
    {
        id: 38,
        title: 'Thinking, Fast and Slow (2011)',
        author: 'Daniel Kahneman',
        publisher: 'Farrar, Straus and Giroux',
        description: 'Tư Duy Nhanh và Chậm là một cuốn sách tâm lý học đột phá, được viết bởi Daniel Kahneman, nhà tâm lý học đoạt giải Nobel. Cuốn sách phân tích hai hệ thống tư duy của con người: Hệ thống 1 (nhanh, trực giác) và Hệ thống 2 (chậm, lý trí). Kahneman giải thích cách hai hệ thống này ảnh hưởng đến quyết định của chúng ta, từ lựa chọn hàng ngày đến các vấn đề phức tạp, và chỉ ra những sai lầm phổ biến như thiên kiến nhận thức. Với các ví dụ thực tế và nghiên cứu sâu rộng, Thinking, Fast and Slow cung cấp cái nhìn sâu sắc về tâm lý con người, hữu ích cho cả cá nhân và chuyên gia.',
        image: 'a5/38.jpg',
        genres: ['international', 'science'],
    },
    {
        id: 39,
        title: 'The Power of Now (1997)',
        author: 'Eckhart Tolle',
        publisher: 'New World Library',
        description: 'Sức Mạnh Của Hiện Tại là một cuốn sách tâm linh, hướng dẫn độc giả sống trọn vẹn trong khoảnh khắc hiện tại, thoát khỏi gánh nặng của quá khứ và lo lắng về tương lai. Eckhart Tolle kết hợp triết lý Đông phương và tư duy phương Tây, nhấn mạnh rằng sự bình an nội tâm đến từ việc chấp nhận hiện tại. Với giọng văn đơn giản nhưng sâu sắc, Tolle cung cấp các bài tập thực hành để đạt được trạng thái "hiện diện". Cuốn sách đã trở thành một hiện tượng toàn cầu, giúp hàng triệu người tìm thấy sự bình yên và ý nghĩa trong cuộc sống.',
        image: 'a5/39.jpg',
        genres: ['international', 'self-help'],
    },
    {
        id: 40,
        title: 'Atomic Habits (2018)',
        author: 'James Clear',
        publisher: 'Avery',
        description: 'Thói Quen Nguyên Tử là một cuốn sách self-help thực tế, khám phá sức mạnh của những thay đổi nhỏ trong thói quen để tạo ra kết quả lớn. James Clear lập luận rằng bằng cách tập trung vào các thói quen nhỏ, được thực hiện đều đặn, chúng ta có thể đạt được những mục tiêu lớn trong cuộc sống. Cuốn sách cung cấp các chiến lược như "luật 1%", làm cho thói quen dễ dàng, và phá vỡ vòng lặp của thói quen xấu. Với các ví dụ thực tế và giọng văn dễ hiểu, Atomic Habits đã trở thành một cuốn sách không thể thiếu cho những ai muốn cải thiện bản thân và đạt được thành công lâu dài.',
        image: 'a5/40.jpg',
        genres: ['international', 'self-help'],
    }
];
window.books = books;

// Sample reviews data
let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
let replies = JSON.parse(localStorage.getItem('replies')) || {};
let userActions = JSON.parse(localStorage.getItem('userActions')) || {};
let savedBooks = JSON.parse(localStorage.getItem('savedBooks')) || {};
// Check if user is logged in
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
if (currentUser) {
    if (loginBtn) loginBtn.classList.add('hidden');
    if (registerBtn) registerBtn.classList.add('hidden');
    if (userMenu) userMenu.classList.remove('hidden');
    const greeting = document.querySelector('.user-greeting');
    if (greeting) greeting.textContent = `Xin chào, ${currentUser.name}`;
}
// ==================== SAVED BOOKS FUNCTIONS ====================
function updateSavedBooksCount() {
    if (!currentUser) {
        const stat = document.querySelector('.saved-books-stat .stat-number');
        if (stat) stat.textContent = '0';
        return;
    }
    const saved = window.getSavedBooksForUser(currentUser.email);
    const stat = document.querySelector('.saved-books-stat .stat-number');
    if (stat) stat.textContent = saved.length;
}

function saveBook(bookId) {
    if (!currentUser) return false;
    
    const userEmail = currentUser.email;
    if (!savedBooks[userEmail]) {
        savedBooks[userEmail] = [];
    }
    
    const index = savedBooks[userEmail].indexOf(bookId);
    if (index === -1) {
        savedBooks[userEmail].push(bookId);
    } else {
        savedBooks[userEmail].splice(index, 1);
    }
    
    localStorage.setItem('savedBooks', JSON.stringify(savedBooks));
    updateSavedBooksCount();
    
    // Cập nhật giao diện ngay lập tức nếu đang ở trang user-profile
    if (window.location.pathname.includes('user-profile.html')) {
        // Trigger custom event để cập nhật giao diện
        window.dispatchEvent(new CustomEvent('savedBooksChanged', {
            detail: { bookId, isSaved: index === -1 }
        }));
    }
    
    return index === -1; // Returns true if book was saved, false if unsaved
}

function isBookSaved(bookId) {
    if (!currentUser) return false;
    const userEmail = currentUser.email;
    return savedBooks[userEmail] && savedBooks[userEmail].includes(bookId);
}

window.getSavedBooksForUser = function(email) {
    return savedBooks[email] || [];
};

function updateSaveButtons() {
    document.querySelectorAll('.btn-save').forEach(button => {
        const bookCard = button.closest('.book-card');
        if (bookCard) {
            const bookId = parseInt(bookCard.dataset.bookId);
            if (isBookSaved(bookId)) {
                button.innerHTML = '<i class="fas fa-check mr-1"></i> Đã lưu';
                button.classList.remove('bg-blue-600', 'hover:bg-blue-700');
                button.classList.add('bg-green-500', 'hover:bg-green-600');
            } else {
                button.innerHTML = '<i class="fas fa-bookmark mr-1"></i> Lưu';
                button.classList.remove('bg-green-500', 'hover:bg-green-600');
                button.classList.add('bg-blue-600', 'hover:bg-blue-700');
            }
        }
    });
}
// ==================== EVENT LISTENERS ====================
// Bookmark Button
document.addEventListener('click', function(e) {
    if (e.target.closest('.btn-save')) {
        e.preventDefault();
        const button = e.target.closest('.btn-save');
        const bookCard = button.closest('.book-card');
        
        if (!bookCard) return;
        
        const bookId = parseInt(bookCard.dataset.bookId);
        
        if (!currentUser) {
            loginModal.classList.remove('hidden');
            return;
        }

        const isSaved = saveBook(bookId);
        const icon = button.querySelector('i');
        
        if (isSaved) {
            icon.classList.remove('fa-bookmark');
            icon.classList.add('fa-check');
            button.innerHTML = '<i class="fas fa-check mr-1"></i> Đã lưu';
            button.classList.remove('bg-blue-600', 'hover:bg-blue-700');
            button.classList.add('bg-green-500', 'hover:bg-green-600');
        } else {
            icon.classList.remove('fa-check');
            icon.classList.add('fa-bookmark');
            button.innerHTML = '<i class="fas fa-bookmark mr-1"></i> Lưu';
            button.classList.remove('bg-green-500', 'hover:bg-green-600');
            button.classList.add('bg-blue-600', 'hover:bg-blue-700');
        }
        
        // Thêm hiệu ứng visual feedback
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
    }
});

// Load saved login credentials
const savedCredentials = JSON.parse(localStorage.getItem('savedCredentials')) || null;
if (savedCredentials && document.getElementById('loginEmail')) {
    document.getElementById('loginEmail').value = savedCredentials.email;
    document.getElementById('loginPassword').value = savedCredentials.password;
    document.getElementById('rememberMe').checked = true;
}

// Modal Toggle
if (loginBtn) loginBtn.addEventListener('click', () => {
    loginModal.classList.remove('hidden');
});

if (registerBtn) registerBtn.addEventListener('click', () => {
    registerModal.classList.remove('hidden');
});

if (closeLoginModal) closeLoginModal.addEventListener('click', () => {
    loginModal.classList.add('hidden');
    clearErrors();
});

if (closeRegisterModal) closeRegisterModal.addEventListener('click', () => {
    registerModal.classList.add('hidden');
    clearErrors();
});

if (switchToRegister) switchToRegister.addEventListener('click', () => {
    loginModal.classList.add('hidden');
    registerModal.classList.remove('hidden');
    clearErrors();
});

if (switchToLogin) switchToLogin.addEventListener('click', () => {
    registerModal.classList.add('hidden');
    loginModal.classList.remove('hidden');
    clearErrors();
});

// Clear error messages
function clearErrors() {
    document.querySelectorAll('.error-message').forEach(error => error.classList.add('hidden'));
}
// Character count and limit for comment
if (commentInput && charCount) {
    commentInput.addEventListener('input', () => {
        const maxLength = 500;
        const minLength = 10;
        const currentLength = commentInput.value.length;
        charCount.textContent = `(${currentLength}/${maxLength})`;
        if (currentLength > maxLength) {
            commentError.textContent = 'Văn bản quá dài, không vượt quá 500 ký tự!';
            commentError.classList.remove('hidden');
        } else if (currentLength > 0 && currentLength < minLength) {
            commentError.textContent = 'Văn bản quá ngắn, văn bản nên từ 10 ký tự trở lên!';
            commentError.classList.remove('hidden');
        } else {
            commentError.classList.add('hidden');
        }
    });
}
// Login Form Submission
if (loginForm) loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email);

    if (!user) {
        document.getElementById('loginEmailError').classList.remove('hidden');
        return;
    }

    if (user.password !== password) {
        document.getElementById('loginPasswordError').classList.remove('hidden');
        return;
    }

    currentUser = { email: user.email, name: user.name };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    if (rememberMe) {
        localStorage.setItem('savedCredentials', JSON.stringify({ email, password }));
    } else {
        localStorage.removeItem('savedCredentials');
    }

    loginModal.classList.add('hidden');
    if (loginBtn) loginBtn.classList.add('hidden');
    if (registerBtn) registerBtn.classList.add('hidden');
    if (userMenu) userMenu.classList.remove('hidden');
    const greeting = document.querySelector('.user-greeting');
    if (greeting) greeting.textContent = `Xin chào, ${currentUser.name}`;
    clearErrors();

    // Update save buttons state
    updateSaveButtons();
    updateSavedBooksCount();

    // Update review form visibility
    if (document.getElementById('reviewFormSection')) {
        document.getElementById('reviewFormSection').classList.remove('hidden');
    }
});

// Register Form Submission
if (registerForm) registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('registerName')?.value || '';
    const email = document.getElementById('registerEmail')?.value || '';
    const password = document.getElementById('registerPassword')?.value || '';
    const confirmPassword = document.getElementById('registerConfirmPassword')?.value || '';

    let hasError = false;
    clearErrors();

    const nameError = document.getElementById('registerNameError');
    const emailError = document.getElementById('registerEmailError');
    const passwordError = document.getElementById('registerPasswordError');
    const confirmPasswordError = document.getElementById('registerConfirmPasswordError');

    if (!name) {
        if (nameError) nameError.classList.remove('hidden');
        hasError = true;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(u => u.email === email)) {
        if (emailError) emailError.classList.remove('hidden');
        hasError = true;
    }

    if (password.length < 6) {
        if (passwordError) passwordError.classList.remove('hidden');
        hasError = true;
    }

    if (password !== confirmPassword) {
        if (confirmPasswordError) confirmPasswordError.classList.remove('hidden');
        hasError = true;
    }

    if (hasError) return;

    users.push({ email, password, name });
    localStorage.setItem('users', JSON.stringify(users));
    currentUser = { email, name };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));

    if (registerModal) registerModal.classList.add('hidden');
    if (loginBtn) loginBtn.classList.add('hidden');
    if (registerBtn) registerBtn.classList.add('hidden');
    if (userMenu) userMenu.classList.remove('hidden');
    const greeting = document.querySelector('.user-greeting');
    if (greeting) greeting.textContent = `Xin chào, ${currentUser.name}`;

    // Update save buttons state
    updateSaveButtons();
    updateSavedBooksCount();

    const reviewFormSection = document.getElementById('reviewFormSection');
    if (reviewFormSection) {
        reviewFormSection.classList.remove('hidden');
    }
});
// Logout
if (logoutBtn) logoutBtn.addEventListener('click', () => {
    currentUser = null;
    localStorage.removeItem('currentUser');
    if (userMenu) userMenu.classList.add('hidden');
    if (loginBtn) loginBtn.classList.remove('hidden');
    if (registerBtn) registerBtn.classList.remove('hidden');
    if (document.getElementById('reviewFormSection')) {
        document.getElementById('reviewFormSection').classList.add('hidden');
    }
    
    // Update save buttons state
    updateSaveButtons();
    updateSavedBooksCount();
});

// Function to create a book card element
function createBookCard(book) {
    const bookReviews = reviews.filter(r => r.bookId === book.id);
    const averageRating = bookReviews.length > 0
        ? (bookReviews.reduce((sum, r) => sum + r.rating, 0) / bookReviews.length).toFixed(1)
        : book.rating || 0;

    const isSaved = isBookSaved(book.id);
    const saveButtonClass = isSaved ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-600 hover:bg-blue-700';
    const saveButtonIcon = isSaved ? 'fa-check' : 'fa-bookmark';
    const saveButtonText = isSaved ? 'Đã lưu' : 'Lưu';

    const card = document.createElement('div');
    card.className = 'book-card';
    card.dataset.bookId = book.id;
    card.dataset.genre = book.genres.join(',');

    card.innerHTML = `
        <img src="${book.image}" alt="${book.title}" class="book-image">
        <div class="book-content">
            <h3 class="book-title">${book.title}</h3>
            <p class="book-author">Tác giả: ${book.author}</p>
            <p class="book-publisher-author">Nhà xuất bản: ${book.publisher}</p>
            <div class="rating-stars" data-book-id="${book.id}">
                ${'<i class="fas fa-star"></i>'.repeat(Math.floor(averageRating))}
                ${averageRating % 1 !== 0 ? '<i class="fas fa-star-half-alt"></i>' : ''}
                <span class="rating-score">${averageRating}</span>
            </div>
            <p class="book-description">${book.description}</p>
            <div class="book-actions">
                <button class="btn-view-reviews" data-book-id="${book.id}">Xem đánh giá</button>
                <button class="btn-save ${saveButtonClass}">
                    <i class="fas ${saveButtonIcon}"></i> ${saveButtonText}
                </button>
            </div>
        </div>
    `;
    return card;
}

// Genre Filter
const genreFilters = document.querySelectorAll('.genre-filter');
const bookGrid = document.getElementById('bookGrid');
const pagination = document.querySelector('.pagination');

genreFilters.forEach(filter => {
    filter.addEventListener('click', () => {
        genreFilters.forEach(f => f.classList.remove('active'));
        filter.classList.add('active');

        const selectedGenre = filter.dataset.genre;
        
        // Clear search input when filtering
        if (searchInput) {
            searchInput.value = '';
        }

        bookGrid.innerHTML = '';

        let filteredBooks;
        if (selectedGenre === 'all') {
            const currentPage = parseInt(document.querySelector('.pagination-btn.active')?.textContent || '1');
            const booksPerPage = 8;
            const startIndex = (currentPage - 1) * booksPerPage;
            const endIndex = startIndex + booksPerPage;
            filteredBooks = books.slice(startIndex, endIndex);
            pagination.classList.remove('hidden');
        } else {
            filteredBooks = books.filter(book => book.genres.includes(selectedGenre));
            pagination.classList.add('hidden');
        }

        if (filteredBooks.length === 0) {
            bookGrid.innerHTML = '<p class="text-center col-span-4">Không tìm thấy sách phù hợp.</p>';
        } else {
            filteredBooks.forEach(book => {
                const bookCard = createBookCard(book);
                bookGrid.appendChild(bookCard);
            });
        }

        // Update event listeners for new cards
        updateBookCardEventListeners();
    });
});

// Update book ratings
function updateBookRatings() {
    if (bookGrid) {
        books.forEach(book => {
            const bookCard = bookGrid.querySelector(`.book-card[data-book-id="${book.id}"]`);
            if (bookCard) {
                const ratingStars = bookCard.querySelector('.rating-stars');
                const bookReviews = reviews.filter(r => r.bookId === book.id);
                const averageRating = bookReviews.length > 0
                    ? (bookReviews.reduce((sum, r) => sum + r.rating, 0) / bookReviews.length).toFixed(1)
                    : book.rating || 0;
                ratingStars.innerHTML = `
                    ${'<i class="fas fa-star"></i>'.repeat(Math.floor(averageRating))}
                    ${averageRating % 1 !== 0 ? '<i class="fas fa-star-half-alt"></i>' : ''}
                    <span class="rating-score">${averageRating}</span>
                `;
            }
        });
    }
}

// View Reviews
const viewReviewButtons = document.querySelectorAll('.btn-view-reviews');
viewReviewButtons.forEach(button => {
    button.addEventListener('click', () => {
        const bookId = button.dataset.bookId;
        if (bookId) {
            window.location.href = `book-review.html?bookId=${bookId}`;
        }
    });
});

// Function to create a reply element
function createReplyElement(reply, isNested = false) {
    const replyElement = document.createElement('div');
    replyElement.className = isNested ? 'nested-reply-item' : 'reply-item';
    replyElement.innerHTML = `
        <div class="reply-item-header">
            <span class="reply-item-user">${reply.user}</span>
            <span class="reply-item-date">${reply.date}</span>
        </div>
        <p class="reply-item-text">${reply.text}</p>
        <div class="reply-item-actions">
            ${currentUser ? `
                <button class="btn-like-reply">
                    <i class="fas fa-thumbs-up"></i> Like (<span class="like-count">${reply.likes || 0}</span>)
                </button>
                <button class="btn-dislike-reply">
                    <i class="fas fa-thumbs-down"></i> Dislike (<span class="dislike-count">${reply.dislikes || 0}</span>)
                </button>
                <button class="btn-reply-to-reply">
                    <i class="fas fa-reply"></i> Trả lời
                </button>
                ${currentUser && (reply.user === currentUser.name || reply.userEmail === currentUser.email) ? `
                    <button class="btn-delete-reply">
                        <i class="fas fa-trash"></i> Xóa
                    </button>
                ` : ''}
            ` : ''}
        </div>
        <div class="nested-reply-section hidden">
            <form class="nested-reply-form">
                <textarea class="form-input nested-reply-input" rows="2" placeholder="Nhập trả lời..." maxlength="500"></textarea>
                <span class="nested-reply-char-count char-count">(0/500)</span>
                <span class="nested-reply-error error-message hidden">Văn bản quá ngắn, văn bản nên từ 10 ký tự trở lên hoặc không vượt quá 500 ký tự!</span>
                <button type="submit" class="form-submit-btn nested-reply-submit-btn">Gửi</button>
            </form>
            <div class="nested-replies-list"></div>
        </div>
    `;
    return replyElement;
}

// Function to render replies (both top-level and nested)
function renderReplies(reviewId, repliesList, parentReplyId = null, preserveOpenForms = false) {
    if (!replies[reviewId]) return;

    // Lưu trạng thái các form đang mở
    const openForms = [];
    if (preserveOpenForms) {
        repliesList.querySelectorAll('.nested-reply-section:not(.hidden)').forEach(section => {
            const replyId = section.closest('[data-reply-id]').dataset.replyId;
            openForms.push(replyId);
        });
    }

    // Clear existing content
    repliesList.innerHTML = '';

    const repliesToRender = parentReplyId 
        ? (replies[reviewId][parentReplyId]?.nestedReplies || [])
        : replies[reviewId];

    repliesToRender.forEach((reply, replyIndex) => {
        const replyElement = createReplyElement(reply, !!parentReplyId);
        const replyKey = parentReplyId ? `${parentReplyId}-${replyIndex}` : replyIndex;
        replyElement.dataset.reviewId = reviewId;
        replyElement.dataset.replyId = replyKey;
        repliesList.appendChild(replyElement);

        // Mở lại các form đã mở trước đó
        if (preserveOpenForms && openForms.includes(replyKey)) {
            const nestedReplySection = replyElement.querySelector('.nested-reply-section');
            if (nestedReplySection) {
                nestedReplySection.classList.remove('hidden');
            }
        }

        // Add event listeners for this reply
        setupReplyEventListeners(replyElement, reviewId, parentReplyId, replyIndex);

        // ĐỆ QUY: Nếu reply này có nestedReplies, render tiếp các nestedReplies vào .nested-replies-list
        if (reply.nestedReplies && reply.nestedReplies.length > 0) {
            const nestedRepliesList = replyElement.querySelector('.nested-replies-list');
            if (nestedRepliesList) {
                renderReplies(reviewId, nestedRepliesList, replyKey);
            }
        }
    });
}

// Function to setup event listeners for a reply element
function setupReplyEventListeners(replyElement, reviewId, parentReplyId, replyIndex) {
    // Like/Dislike Reply
    replyElement.querySelector('.btn-like-reply')?.addEventListener('click', () => handleLikeDislikeReply(reviewId, parentReplyId, replyIndex, true));
    replyElement.querySelector('.btn-dislike-reply')?.addEventListener('click', () => handleLikeDislikeReply(reviewId, parentReplyId, replyIndex, false));

    // Delete Reply
            replyElement.querySelector('.btn-delete-reply')?.addEventListener('click', () => {
            if (currentUser) {
                let reply;
                if (parentReplyId !== null) {
                    // This is a nested reply
                    reply = replies[reviewId][parentReplyId]?.nestedReplies?.[replyIndex];
                } else {
                    // This is a top-level reply
                    reply = replies[reviewId][replyIndex];
                }

                if (reply && (reply.user === currentUser.name || reply.userEmail === currentUser.email)) {
                    if (parentReplyId !== null) {
                        replies[reviewId][parentReplyId].nestedReplies.splice(replyIndex, 1);
                    } else {
                        replies[reviewId].splice(replyIndex, 1);
                    }
                    localStorage.setItem('replies', JSON.stringify(replies));
                    
                    // Find the appropriate list to re-render
                    const listToUpdate = parentReplyId !== null
                        ? document.querySelector(`[data-review-id="${reviewId}"][data-reply-id="${parentReplyId}"] .nested-replies-list`)
                        : document.querySelector(`.replies-list[data-review-id="${reviewId}"]`);
                    
                    if (listToUpdate) {
                        renderReplies(reviewId, listToUpdate, parentReplyId, true);
                    }
                }
            }
        });

        // Tương tự cho phần xử lý xóa review, thay thế phần btn-delete-review bằng:
        document.querySelectorAll('.btn-delete-review').forEach(button => {
            button.addEventListener('click', () => {
                const reviewId = button.dataset.reviewId;
                if (currentUser && reviews[reviewId] && reviews[reviewId].user === currentUser.name) {
                    reviews.splice(reviewId, 1);
                    localStorage.setItem('reviews', JSON.stringify(reviews));
                    delete replies[reviewId];
                    localStorage.setItem('replies', JSON.stringify(replies));
                    window.location.reload();
                }
            });
        });

    // Reply to Reply
    replyElement.querySelector('.btn-reply-to-reply')?.addEventListener('click', (e) => {
        e.preventDefault();
        if (!currentUser) {
            loginModal.classList.remove('hidden');
            return;
        }

        const nestedReplySection = replyElement.querySelector('.nested-reply-section');
        nestedReplySection.classList.toggle('hidden');

        if (!nestedReplySection.classList.contains('hidden')) {
            const nestedReplyInput = nestedReplySection.querySelector('.nested-reply-input');
            const nestedReplyCharCount = nestedReplySection.querySelector('.nested-reply-char-count');
            const nestedReplyError = nestedReplySection.querySelector('.nested-reply-error');
            const nestedReplyForm = nestedReplySection.querySelector('.nested-reply-form');
            const nestedRepliesList = nestedReplySection.querySelector('.nested-replies-list');

            // Setup character count
            nestedReplyInput.addEventListener('input', () => {
                const maxLength = 500;
                const minLength = 10;
                const currentLength = nestedReplyInput.value.length;
                nestedReplyCharCount.textContent = `(${currentLength}/${maxLength})`;
                if (currentLength > maxLength) {
                    nestedReplyError.textContent = 'Văn bản quá dài, không vượt quá 500 ký tự!';
                    nestedReplyError.classList.remove('hidden');
                } else if (currentLength > 0 && currentLength < minLength) {
                    nestedReplyError.textContent = 'Văn bản quá ngắn, văn bản nên từ 10 ký tự trở lên!';
                    nestedReplyError.classList.remove('hidden');
                } else {
                    nestedReplyError.classList.add('hidden');
                }
            });

            // Handle form submission
            nestedReplyForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const replyText = nestedReplyInput.value.trim();
                const maxLength = 500;
                const minLength = 10;

                if (replyText.length < minLength || replyText.length > maxLength) {
                    nestedReplyError.textContent = replyText.length < minLength
                        ? 'Văn bản quá ngắn, văn bản nên từ 10 ký tự trở lên!'
                        : 'Văn bản quá dài, không vượt quá 500 ký tự!';
                    nestedReplyError.classList.remove('hidden');
                    return;
                }

                const date = new Date().toLocaleString('vi-VN', {
                    timeZone: 'Asia/Ho_Chi_Minh',
                    hour12: true,
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });

                // Initialize nested replies structure if not exists
                if (!replies[reviewId]) {
                    replies[reviewId] = {};
                }
                if (parentReplyId !== null && !replies[reviewId][parentReplyId]) {
                    replies[reviewId][parentReplyId] = { nestedReplies: [] };
                } else if (parentReplyId !== null && !replies[reviewId][parentReplyId].nestedReplies) {
                    replies[reviewId][parentReplyId].nestedReplies = [];
                }

                if (parentReplyId !== null) {
                    replies[reviewId][parentReplyId].nestedReplies.push({
                        user: currentUser.name,
                        userEmail: currentUser.email,
                        text: replyText,
                        date,
                        likes: 0,
                        dislikes: 0
                    });
                } else {
                    if (!replies[reviewId]) {
                        replies[reviewId] = [];
                    }
                    replies[reviewId].push({
                        user: currentUser.name,
                        userEmail: currentUser.email,
                        text: replyText,
                        date,
                        likes: 0,
                        dislikes: 0
                    });
                }

                localStorage.setItem('replies', JSON.stringify(replies));
                
                // Render lại với preserveOpenForms = true để giữ các form đang mở
                renderReplies(reviewId, nestedRepliesList, parentReplyId, true);
                
                // Reset form
                nestedReplyInput.value = '';
                nestedReplyCharCount.textContent = '(0/500)';
                nestedReplyError.classList.add('hidden');
            });

            // Chỉ render nếu có replies nhưng danh sách trống
            if (parentReplyId !== null && replies[reviewId]?.[parentReplyId]?.nestedReplies?.length > 0 && !nestedRepliesList.hasChildNodes()) {
                renderReplies(reviewId, nestedRepliesList, parentReplyId);
            }
        }
    });
}

// Function to handle like/dislike for replies
function handleLikeDislikeReply(reviewId, parentReplyId, replyIndex, isLike) {
    if (!currentUser) {
        loginModal.classList.remove('hidden');
        return;
    }

    let reply;
    if (parentReplyId !== null) {
        // This is a nested reply
        reply = replies[reviewId][parentReplyId]?.nestedReplies?.[replyIndex];
    } else {
        // This is a top-level reply
        reply = replies[reviewId][replyIndex];
    }

    if (!reply) return;

    const actionKey = `${currentUser.email}-${isLike ? 'like' : 'dislike'}-r${reviewId}-${parentReplyId !== null ? `p${parentReplyId}-` : ''}r${replyIndex}`;
    const countType = isLike ? 'likes' : 'dislikes';
    
    if (userActions[actionKey]) {
        // Undo like/dislike
        reply[countType] = Math.max(0, reply[countType] - 1);
        delete userActions[actionKey];
    } else {
        // Add like/dislike
        reply[countType] = (reply[countType] || 0) + 1;
        userActions[actionKey] = true;
    }

    localStorage.setItem('userActions', JSON.stringify(userActions));
    localStorage.setItem('replies', JSON.stringify(replies));

    // Update UI for the specific reply
    const replyElement = document.querySelector(`[data-review-id="${reviewId}"][data-reply-id="${parentReplyId !== null ? `${parentReplyId}-${replyIndex}` : replyIndex}"]`);
    if (replyElement) {
        replyElement.querySelector(`.${isLike ? 'like' : 'dislike'}-count`).textContent = reply[countType];
    }
}

// Book Review Page Logic
if (window.location.pathname.includes('book-review.html')) {
    const urlParams = new URLSearchParams(window.location.search);
    const bookId = urlParams.get('bookId');
    
    if (bookId) {
        const book = books.find(b => b.id === parseInt(bookId));
        if (book) {
            const bookInfo = document.getElementById('bookInfo');
            if (bookInfo) {
                const bookReviews = reviews.filter(r => r.bookId === parseInt(bookId));
                const averageRating = bookReviews.length > 0
                    ? (bookReviews.reduce((sum, r) => sum + r.rating, 0) / bookReviews.length).toFixed(1)
                    : book.rating || 0;

                bookInfo.innerHTML = `
                    <img src="${book.image}" alt="${book.title}" class="book-detail-image">
                    <div class="book-detail-info">
                        <h2 class="book-detail-title">${book.title}</h2>
                        <p class="book-detail-author">Tác giả: ${book.author}</p>
                        <p class="book-detail-publisher">Nhà xuất bản: ${book.publisher}</p>
                        <div class="rating-stars">
                            ${'<i class="fas fa-star"></i>'.repeat(Math.floor(averageRating))}
                            ${averageRating % 1 !== 0 ? '<i class="fas fa-star-half-alt"></i>' : ''}
                            <span class="rating-score">${averageRating}</span>
                        </div>
                        <p class="book-detail-description">${book.description}</p>
                    </div>
                `;

                const reviewList = document.getElementById('reviewList');
                if (reviewList) {
                    reviewList.innerHTML = bookReviews.length > 0 ? bookReviews.map((review, index) => `
                        <div class="review-item" data-review-id="${index}">
                            <div class="review-item-header">
                                <span class="review-item-user">${review.user}</span>
                                <span class="review-item-date">${review.date}</span>
                            </div>
                            <div class="review-item-rating">
                                ${'<i class="fas fa-star"></i>'.repeat(review.rating)}
                            </div>
                            <p class="review-item-comment">${review.comment}</p>
                            <div class="review-item-actions">
                                ${currentUser ? `
                                    <button class="btn-like" data-review-id="${index}">
                                        <i class="fas fa-thumbs-up"></i> Like (<span class="like-count">${review.likes || 0}</span>)
                                    </button>
                                    <button class="btn-dislike" data-review-id="${index}">
                                        <i class="fas fa-thumbs-down"></i> Dislike (<span class="dislike-count">${review.dislikes || 0}</span>)
                                    </button>
                                    <button class="btn-reply" data-review-id="${index}">
                                        <i class="fas fa-reply"></i> Trả lời
                                    </button>
                                    ${currentUser && (review.user === currentUser.name || review.userEmail === currentUser.email) ? `
                                        <button class="btn-delete-review" data-review-id="${index}">
                                            <i class="fas fa-trash"></i> Xóa
                                        </button>
                                    ` : ''}
                                ` : ''}
                            </div>
                            <div class="reply-section" data-review-id="${index}">
                                <form class="reply-form hidden">
                                    <textarea class="form-input reply-input" rows="2" placeholder="Nhập trả lời của bạn..." maxlength="500"></textarea>
                                    <span class="reply-char-count char-count">(0/500)</span>
                                    <span class="reply-error error-message hidden">Văn bản quá ngắn, văn bản nên từ 10 ký tự trở lên hoặc không vượt quá 500 ký tự!</span>
                                    <button type="submit" class="form-submit-btn reply-submit-btn">Gửi</button>
                                </form>
                                <div class="replies-list"></div>
                            </div>
                        </div>
                    `).join('') : '<p>Chưa có đánh giá nào.</p>';

                    bookReviews.forEach((review, index) => {
                        const replySection = document.querySelector(`.reply-section[data-review-id="${index}"]`);
                        if (replySection) {
                            const repliesList = replySection.querySelector('.replies-list');
                            repliesList.dataset.reviewId = index;
                            renderReplies(index, repliesList);
                        }
                    });
                }

                // Delete Review
                document.querySelectorAll('.btn-delete-review').forEach(button => {
                    button.addEventListener('click', () => {
                        const reviewId = button.dataset.reviewId;
                        if (currentUser && reviews[reviewId] && (reviews[reviewId].user === currentUser.name || reviews[reviewId].userEmail === currentUser.email)) {
                            reviews.splice(reviewId, 1);
                            localStorage.setItem('reviews', JSON.stringify(reviews));
                            delete replies[reviewId];
                            localStorage.setItem('replies', JSON.stringify(replies));
                            window.location.reload();
                        } else {
                            console.log('Cannot delete: User mismatch or review not found');
                        }
                    });
                });

                // Like/Dislike Review with Toggle
                document.querySelectorAll('.btn-like, .btn-dislike').forEach(button => {
                    button.addEventListener('click', () => {
                        if (!currentUser) {
                            loginModal.classList.remove('hidden');
                            return;
                        }
                        const reviewId = button.dataset.reviewId;
                        const review = reviews[reviewId];
                        const isLike = button.classList.contains('btn-like');
                        const actionKey = `${currentUser.email}-${isLike ? 'like' : 'dislike'}-${reviewId}`;
                        const countElement = button.querySelector(isLike ? '.like-count' : '.dislike-count');
                        const currentCount = parseInt(countElement.textContent) || 0;

                        if (userActions[actionKey]) {
                            if (isLike) {
                                review.likes = Math.max(0, review.likes - 1);
                            } else {
                                review.dislikes = Math.max(0, review.dislikes - 1);
                            }
                            delete userActions[actionKey];
                            countElement.textContent = Math.max(0, currentCount - 1);
                            button.disabled = false;
                        } else {
                            if (isLike) {
                                review.likes = (review.likes || 0) + 1;
                            } else {
                                review.dislikes = (review.dislikes || 0) + 1;
                            }
                            userActions[actionKey] = true;
                            countElement.textContent = currentCount + 1;
                            button.disabled = true;
                        }

                        localStorage.setItem('userActions', JSON.stringify(userActions));
                        localStorage.setItem('reviews', JSON.stringify(reviews));
                    });
                });

                // Review Form Submission with character limits
                const reviewForm = document.getElementById('reviewForm');
                if (reviewForm) {
                    reviewForm.addEventListener('submit', (e) => {
                        e.preventDefault();
                        if (!currentUser) {
                            loginModal.classList.remove('hidden');
                            return;
                        }

                        const rating = document.getElementById('rating').value;
                        const comment = commentInput.value.trim();
                        const maxLength = 500;
                        const minLength = 10;

                        if (comment.length < minLength || comment.length > maxLength) {
                            if (comment.length < minLength) {
                                commentError.textContent = 'Văn bản quá ngắn, văn bản nên từ 10 ký tự trở lên!';
                            } else {
                                commentError.textContent = 'Văn bản quá dài, không vượt quá 500 ký tự!';
                            }
                            commentError.classList.remove('hidden');
                            return;
                        }

                        const date = new Date().toLocaleString('vi-VN', {
                            timeZone: 'Asia/Ho_Chi_Minh',
                            hour12: true,
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        });

                        reviews.push({
                            bookId: parseInt(bookId),
                            user: currentUser.name,
                            userEmail: currentUser.email,
                            rating: parseInt(rating),
                            comment,
                            date,
                            likes: 0,
                            dislikes: 0
                        });

                        localStorage.setItem('reviews', JSON.stringify(reviews));
                        window.location.reload();
                    });
                }

                // Reply to Review
                document.querySelectorAll('.btn-reply').forEach(button => {
                    button.addEventListener('click', (e) => {
                        e.preventDefault();
                        if (!currentUser) {
                            loginModal.classList.remove('hidden');
                            return;
                        }
                        const reviewId = button.dataset.reviewId;
                        const replySection = document.querySelector(`.reply-section[data-review-id="${reviewId}"]`);
                        if (replySection) {
                            const replyForm = replySection.querySelector('.reply-form');
                            replyForm.classList.toggle('hidden');
                            if (!replyForm.classList.contains('hidden')) {
                                const replyInput = replySection.querySelector('.reply-input');
                                const replyCharCount = replySection.querySelector('.reply-char-count');
                                const replyError = replySection.querySelector('.reply-error');
                                const repliesList = replySection.querySelector('.replies-list');

                                replyInput.addEventListener('input', () => {
                                    const maxLength = 500;
                                    const minLength = 10;
                                    const currentLength = replyInput.value.length;
                                    replyCharCount.textContent = `(${currentLength}/${maxLength})`;
                                    if (currentLength > maxLength) {
                                        replyError.textContent = 'Văn bản quá dài, không vượt quá 500 ký tự!';
                                        replyError.classList.remove('hidden');
                                    } else if (currentLength > 0 && currentLength < minLength) {
                                        replyError.textContent = 'Văn bản quá ngắn, văn bản nên từ 10 ký tự trở lên!';
                                        replyError.classList.remove('hidden');
                                    } else {
                                        replyError.classList.add('hidden');
                                    }
                                });

                                replyForm.addEventListener('submit', (e) => {
                                    e.preventDefault();
                                    const replyText = replyInput.value.trim();
                                    const maxLength = 500;
                                    const minLength = 10;

                                    if (replyText.length < minLength || replyText.length > maxLength) {
                                        if (replyText.length < minLength) {
                                            replyError.textContent = 'Văn bản quá ngắn, văn bản nên từ 10 ký tự trở lên!';
                                        } else {
                                            replyError.textContent = 'Văn bản quá dài, không vượt quá 500 ký tự!';
                                        }
                                        replyError.classList.remove('hidden');
                                        return;
                                    }

                                    const date = new Date().toLocaleString('vi-VN', {
                                        timeZone: 'Asia/Ho_Chi_Minh',
                                        hour12: true,
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    });
                                    
                                    if (!replies[reviewId]) {
                                        replies[reviewId] = [];
                                    }
                                    
                                    replies[reviewId].push({
                                        user: currentUser.name,
                                        userEmail: currentUser.email,
                                        text: replyText,
                                        date,
                                        likes: 0,
                                        dislikes: 0
                                    });

                                    localStorage.setItem('replies', JSON.stringify(replies));
                                    replyInput.value = '';
                                    replyCharCount.textContent = '(0/500)';
                                    replyError.classList.add('hidden');
                                    renderReplies(reviewId, repliesList, null, true);
                                });

                                renderReplies(reviewId, repliesList);
                            }
                        }
                    });
                });
                
                if (currentUser && document.getElementById('reviewFormSection')) {
                    document.getElementById('reviewFormSection').classList.remove('hidden');
                }
            }
        }
    }
}

// Update ratings on page load
updateBookRatings();

// Search functionality
if (searchInput && searchButton) {
    // Search on button click
    searchButton.addEventListener('click', performSearch);
    
    // Search on Enter key press
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            performSearch();
        }
    });
    
    // Search on input change with debounce for better performance
    let searchTimeout;
    searchInput.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(performSearch, 300); // 300ms delay
    });
    
    // Clear search when clicking on "Tất cả" filter
    const allFilter = document.querySelector('.genre-filter[data-genre="all"]');
    if (allFilter) {
        allFilter.addEventListener('click', () => {
            if (searchInput) {
                searchInput.value = '';
                performSearch(); // Trigger search to show all books
            }
        });
    }
    
    // Add placeholder text animation
    searchInput.addEventListener('focus', () => {
        if (searchInput.placeholder) {
            searchInput.placeholder = 'Tìm kiếm sách, tác giả...';
        }
    });
    
    searchInput.addEventListener('blur', () => {
        if (searchInput.placeholder) {
            searchInput.placeholder = 'Tìm kiếm sách, tác giả...';
        }
    });
}

function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    // Add loading state
    const searchBar = document.querySelector('.search-bar');
    if (searchBar) {
        searchBar.classList.add('search-loading');
    }
    
    // Check if we're on a page with book grid
    if (!bookGrid) {
        // If no book grid, redirect to home page with search
        if (searchTerm) {
            window.location.href = `index.html?search=${encodeURIComponent(searchTerm)}`;
        } else {
            window.location.href = 'index.html';
        }
        return;
    }
    
    // Get current active genre filter
    const activeGenreFilter = document.querySelector('.genre-filter.active');
    const selectedGenre = activeGenreFilter ? activeGenreFilter.dataset.genre : 'all';
    
    if (!searchTerm) {
        // If search is empty, show books based on current genre filter
        if (selectedGenre === 'all') {
            const currentPage = parseInt(document.querySelector('.pagination-btn.active')?.textContent || '1');
            const booksPerPage = 8;
            const startIndex = (currentPage - 1) * booksPerPage;
            const endIndex = startIndex + booksPerPage;
            const currentBooks = books.slice(startIndex, endIndex);
            
            bookGrid.innerHTML = '';
            currentBooks.forEach(book => {
                const bookCard = createBookCard(book);
                bookGrid.appendChild(bookCard);
            });
            
            // Show pagination for "all" genre
            if (pagination) pagination.classList.remove('hidden');
        } else {
            // Show books for selected genre
            const filteredBooks = books.filter(book => book.genres.includes(selectedGenre));
            
            bookGrid.innerHTML = '';
            if (filteredBooks.length === 0) {
                bookGrid.innerHTML = '<p class="text-center col-span-4">Không tìm thấy sách phù hợp.</p>';
            } else {
                filteredBooks.forEach(book => {
                    const bookCard = createBookCard(book);
                    bookGrid.appendChild(bookCard);
                });
            }
            
            // Hide pagination for specific genres
            if (pagination) pagination.classList.add('hidden');
        }
        
        // Update event listeners for new cards
        updateBookCardEventListeners();
        
        // Remove loading state
        if (searchBar) {
            searchBar.classList.remove('search-loading');
        }
        return;
    }
    
    // Filter books based on search term and current genre filter
    let filteredBooks = books.filter(book => 
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm) ||
        book.description.toLowerCase().includes(searchTerm) ||
        book.publisher.toLowerCase().includes(searchTerm)
    );
    
    // Apply genre filter if not "all"
    if (selectedGenre !== 'all') {
        filteredBooks = filteredBooks.filter(book => book.genres.includes(selectedGenre));
    }
    
    // Clear current books
    bookGrid.innerHTML = '';
    
    if (filteredBooks.length === 0) {
        bookGrid.innerHTML = `<p class="search-results-empty">Không tìm thấy sách phù hợp với từ khóa: <strong>"${searchTerm}"</strong></p>`;
    } else {
        filteredBooks.forEach(book => {
            const bookCard = createBookCard(book);
            bookGrid.appendChild(bookCard);
        });
    }
    
    // Hide pagination when searching
    if (pagination) pagination.classList.add('hidden');
    
    // Update event listeners for new cards
    updateBookCardEventListeners();
    
    // Remove loading state
    if (searchBar) {
        searchBar.classList.remove('search-loading');
    }
}

function updateBookCardEventListeners() {
    if (!bookGrid) return;
    
    // Add event listeners for view reviews buttons
    bookGrid.querySelectorAll('.btn-view-reviews').forEach(button => {
        button.addEventListener('click', () => {
            const bookId = button.dataset.bookId;
            if (bookId) {
                window.location.href = `book-review.html?bookId=${bookId}`;
            }
        });
    });
    
    // Add event listeners for save buttons
    bookGrid.querySelectorAll('.btn-save').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const bookCard = button.closest('.book-card');
            if (!bookCard) return;
            
            const bookId = parseInt(bookCard.dataset.bookId);
            
            if (!currentUser) {
                loginModal.classList.remove('hidden');
                return;
            }

            const isSaved = saveBook(bookId);
            const icon = button.querySelector('i');
            
            if (isSaved) {
                icon.classList.remove('fa-bookmark');
                icon.classList.add('fa-check');
                button.innerHTML = '<i class="fas fa-check mr-1"></i> Đã lưu';
                button.classList.remove('bg-blue-600', 'hover:bg-blue-700');
                button.classList.add('bg-green-500', 'hover:bg-green-600');
            } else {
                icon.classList.remove('fa-check');
                icon.classList.add('fa-bookmark');
                button.innerHTML = '<i class="fas fa-bookmark mr-1"></i> Lưu';
                button.classList.remove('bg-green-500', 'hover:bg-green-600');
                button.classList.add('bg-blue-600', 'hover:bg-blue-700');
            }
            
            // Add visual feedback
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Update save buttons when page loads
document.addEventListener('DOMContentLoaded', () => {
    updateSaveButtons();
    updateBookCardEventListeners();
    
    // Handle search parameter from URL
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    if (searchParam && searchInput) {
        searchInput.value = decodeURIComponent(searchParam);
        performSearch();
    }
});

// Khi trang load xong cũng cập nhật
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateSavedBooksCount);
} else {
    updateSavedBooksCount();
}