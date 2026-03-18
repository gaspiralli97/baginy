console.log("Products frontend javascript file");

$(function() {
$("#process-btn").on("click", () =>{
        $(".product-container").slideToggle(500);
        $("#process-btn").css("display","none");

    });


     $("#product-type-select").on("change", function () {
        if ($(this).val() === "TRAVEL") {
            $("#product-size-box").slideDown(200);
            $(".product-size").prop("disabled", false);
        } else {
            $("#product-size-box").slideUp(200);
            $(".product-size").prop("disabled", true);
        }
     });

     // disable size on page load since default type is not TRAVEL
     if ($("#product-type-select").val() !== "TRAVEL") {
        $(".product-size").prop("disabled", true);
     }

     $("#cancel-btn").on("click", () =>{
        $(".product-container").slideToggle(100);
        $("#process-btn").css("display","flex");

    });

     // Apply color on page load
     $(".new-product-status").each(function() {
        applyStatusColor($(this));
     });

     $(".new-product-status").on("change", async function (e){
        applyStatusColor($(this));
        const id = e.target.id,
              productStatus=$(`#${id}.new-product-status`).val();
        console.log("id",id);
        console.log("productStatus:", productStatus);

        try {
            const response=await axios.post(`/admin/product/${id}`, {
                productStatus:productStatus,

            });
            console.log("response:", response);
            const result = response.data;
            if(result.data) {
                console.log("Product updated!");
                $(".new-product-status").blur();
            } else alert ("Product update failed!");
        } catch (error) {
            console.log(err);
            alert("Product update failed!");
        }

     });
});

function applyStatusColor(el) {
    const val = el.val();
    el.removeClass("status-pause status-process status-delete");
    if (val === "PAUSE")   el.addClass("status-pause");
    if (val === "PROCESS") el.addClass("status-process");
    if (val === "DELETE")  el.addClass("status-delete");
}

function validateForm () {
    const productName = $(".product-name").val(),
          productPrice = $(".product-price").val(),
          productLeftCount = $(".product-left-count").val(),
          productCollection = $(".product-collection").val(),
          productDesc = $(".product-desc").val(),
          productStatus = $(".product-status").val();
    if(
        productName=== "" ||
        productPrice === "" ||
        productLeftCount === "" ||
        productCollection === "" ||
        productDesc  === ""  ||
        productStatus  === ""
    ){
        alert("Please insert all dtails!");
        return false;
    } else return true;
}

function previewFileHandler(input, order) {
    const imgClassName = input.className;
    
    
    const file = $(`.${imgClassName}`).get(0).files[0],
          fileType = file["type"],
          validImageType= ["image/jpg","image/jpeg", "image/png"];

    if(!validImageType.includes(fileType)) {
        alert ("Please insert only jpeg,jpg and png!");
    } else{
        if(file) {
            const reader= new FileReader();
            reader.onload = function() {
                $(`#image-section-${order}`).attr("src", reader.result);
            };
            reader.readAsDataURL(file);
        }
    }
}