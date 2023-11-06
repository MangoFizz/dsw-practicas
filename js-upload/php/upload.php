<?php
    $filename = $_FILES['file']['name'];
    $tmp_name = $_FILES['file']['tmp_name'];
    $file_up_name = time() . $filename;

    // PREVENT PHP FILES FROM BEING UPLOADED
    $file_ext = pathinfo($file_up_name, PATHINFO_EXTENSION);
    if ($file_ext == "php") {
        die("PHP files are not allowed!");
    }

    // SET FILE SIZE LIMIT
    $file_size = $_FILES['file']['size'];
    if ($file_size > 1000000) {
        die("File size is too big!");
    }

    // SET MAXIMUM NUMBER OF FILES
    $files = scandir("files/");
    $num_files = count($files) - 2;
    if ($num_files >= 10) {
        die("You can only upload 10 files!");
    }

    move_uploaded_file($tmp_name, "files/" . $file_up_name);
?>
