<?php
require __DIR__ . '/__connect_db.php';
header("Access-Control-Allow-Origin: *");

// 判斷時間配對列表是否超過24小時
$nowTimeStamp = time(); //獲取當前時間戳

$gameListSql = "SELECT * FROM `mb_gameList` WHERE `sid`= 1";
$gameListTime = $pdo->query($gameListSql)->fetch()['created_at'];
$gameListTimeStamp = strtotime($gameListTime);  //獲取創建配對列表時的時間戳

// 如果現在時間大於配對列表創建時間+24小時的話就更新配對列表
if ($nowTimeStamp > ($gameListTimeStamp + 86400000)) {

    // 製造出新的配對列表陣列
    // 會員二手書書籍表格內條件為(亂數拿取!!會員號碼不重複+書籍狀態有配對中(0)的欄位=可以參加遊戲)
    $canPlayGameMember_sql = "SELECT DISTINCT `mb_shelveMember` FROM `mb_books` WHERE `mb_status`= 0 && `mb_shelveMember` != 'MR00000' ORDER BY RAND() ";
    $canPlayGameMember_rows = $pdo->query($canPlayGameMember_sql)->fetchAll();
    // print_r($canPlayGameMember_rows);

    // 官方假的會員
    $fakeMember_sql = "SELECT `mb_shelveMember` FROM `mb_books` WHERE `mb_shelveMember` = 'MR00000'";
    $fakeMember_rows = $pdo->query($fakeMember_sql)->fetch();
    // print_r($fakeMember_rows);

    // 若可以參加遊戲會員數量為基數時需補官方假的會員進去,讓全部參加遊戲人數為偶數
    if (count($canPlayGameMember_rows) % 2 != 0) {
        array_push($canPlayGameMember_rows, $fakeMember_rows);
        // print_r($canPlayGameMember_rows);
    }

    // 將參加人數分為兩兩一組
    $canPlayGameMember_rows_group =  array_chunk($canPlayGameMember_rows, 2);
    // print_r($canPlayGameMember_rows_group);

    // 取得所有書籍狀態為配對中(0)的書籍詳細資料
    $bookAllData_sql = "SELECT * FROM `mb_books` WHERE `mb_status` = 0";
    $bookAllData_rows = $pdo->query($bookAllData_sql)->fetchAll();
    // print_r($bookAllData_rows);

    // 透過mb_shelveMember判斷,將取得的書籍所有資料放入已經倆倆分組好的陣列內
    foreach ($bookAllData_rows as $key => $value) {
        for ($i = 0; $i < count($canPlayGameMember_rows_group); $i++) {
            if ($canPlayGameMember_rows_group[$i][0]['mb_shelveMember'] == $value['mb_shelveMember']) {
                array_push($canPlayGameMember_rows_group[$i][0], $value);
            } elseif ($canPlayGameMember_rows_group[$i][1]['mb_shelveMember'] == $value['mb_shelveMember']) {
                array_push($canPlayGameMember_rows_group[$i][1], $value);
            }
        }
    }

    // $canPlayGameMember_rows_group ->最終亂數分配好的陣列
    // 更新配對列表
    // 將取得的資料解析成字串後儲存至資料庫的配對列表(mb_gameList)
    $serialized_data = serialize($canPlayGameMember_rows_group);
    $serialized_data_query = "UPDATE `mb_gameList` SET `sid`='1',`member`='$serialized_data',`created_at`= NOW() WHERE `sid`='1' ";
    $pdo->query($serialized_data_query);
}

//-------------------------------------初始化使用--------------------------------------
// 會員二手書書籍表格內條件為(亂數拿取!!會員號碼不重複+書籍狀態有配對中(0)的欄位=可以參加遊戲)
// $canPlayGameMember_sql = "SELECT DISTINCT `mb_shelveMember` FROM `mb_books` WHERE `mb_status`= 0 && `mb_shelveMember` != 'MR00000' ORDER BY RAND() ";
// $canPlayGameMember_rows = $pdo->query($canPlayGameMember_sql)->fetchAll();
// // print_r($canPlayGameMember_rows);

// // 官方假的會員
// $fakeMember_sql = "SELECT `mb_shelveMember` FROM `mb_books` WHERE `mb_shelveMember` = 'MR00000'";
// $fakeMember_rows = $pdo->query($fakeMember_sql)->fetch();
// // print_r($fakeMember_rows);

// // 若可以參加遊戲會員數量為基數時需補官方假的會員進去,讓全部參加遊戲人數為偶數
// if (count($canPlayGameMember_rows) % 2 != 0) {
//     array_push($canPlayGameMember_rows, $fakeMember_rows);
//     // print_r($canPlayGameMember_rows);
// }

// // 將參加人數分為兩兩一組
// $canPlayGameMember_rows_group =  array_chunk($canPlayGameMember_rows, 2);
// // print_r($canPlayGameMember_rows_group);

// // 取得所有書籍狀態為配對中(0)的書籍詳細資料
// $bookAllData_sql = "SELECT * FROM `mb_books` WHERE `mb_status` = 0";
// $bookAllData_rows = $pdo->query($bookAllData_sql)->fetchAll();
// // print_r($bookAllData_rows);

// // 透過mb_shelveMember判斷,將取得的書籍所有資料放入已經倆倆分組好的陣列內
// foreach ($bookAllData_rows as $key => $value) {
//     for ($i = 0; $i < count($canPlayGameMember_rows_group); $i++) {
//         if ($canPlayGameMember_rows_group[$i][0]['mb_shelveMember'] == $value['mb_shelveMember']) {
//             array_push($canPlayGameMember_rows_group[$i][0], $value);
//         } elseif ($canPlayGameMember_rows_group[$i][1]['mb_shelveMember'] == $value['mb_shelveMember']) {
//             array_push($canPlayGameMember_rows_group[$i][1], $value);
//         }
//     }
// }

// // $canPlayGameMember_rows_group ->最終亂數分配好的陣列
// // 將取得的資料解析成字串後儲存至資料庫的配對列表(mb_game)
// $serialized_data = serialize($canPlayGameMember_rows_group);
// $serialized_data_query = "INSERT INTO mb_gameList (`sid`,`member`,`created_at`)
// VALUES ('1','$serialized_data',NOW())";
// $pdo->query($serialized_data_query);

//--------------------------初始化使用---------------------------------------------


// 拿取資料庫的配對列表(mb_gameList裡面的配對列表,放在欄位名member內)
$gameList = $pdo->query($gameListSql)->fetch()['member'];
$unserialized_data = unserialize($gameList);

echo json_encode($unserialized_data);
