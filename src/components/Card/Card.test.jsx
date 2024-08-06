const { screen, render } = require("@testing-library/react")
import Card from "."
import userEvent from "@testing-library/user-event"

//? prop olarak gönderilecek item
const item = {
    name: "Chocolate",
    imagePath: "/images/chocolate.png",
    id: "a3e9",
}

//? prop olarak gönderilecek basket
const basket = [
    {
        name: "Chocolate",
        imagePath: "/images/chocolate.png",
        id: "a3e9",
        amount: 3,
    },
    {
        name: "Vanilla",
        imagePath: "/images/vanilla.png",
        id: "ce3f",
        amount: 1,
    }
]

//! Prop olarak veri alan bir bileşeni test ediyorsak bileşenin aldığı propları test ortamında da görmemiz gerekli
test("Miktar, başlık, fotoğraf gelen prop a göre ekrana basılır", () => {
    render(<Card item={item} addToBasket={() => {}} removeFromBasket={() => {}} basket={basket} />)

    //? 1 miktar spanını çağır
    const amount = screen.getByTestId("amount")

    //? 2 span içeriği 3 mü kontrol et
    expect(amount).toHaveTextContent(/^3$/)

    //? chocolate yazısı ekrana geldi mi kontrol et
    screen.getByText("Chocolate")

    //? resim elementini çağır
    const img = screen.getByAltText("çeşit-resim")

    //? resim kaynağı doğru mu kontrol et
    expect(img).toHaveAttribute("src", "/images/chocolate.png")
})

test("Butonlara tıklanınca fonksiyonlar doğru parametrelerle çalışır", async () => {
    const user = userEvent.setup()

    //? prop olarak gönderilecek fonksiyonları test edeceksek jest awacılığı (mock) ile test edilebilir fonksiyonlar oluştur
    const addMockFn = jest.fn()
    const removeMockFn = jest.fn()

    render(
        <Card 
        item={item}
        basket={basket}
        addToBasket={addMockFn}
        removeFromBasket={removeMockFn}
        />
    )

    //? butonları al
    const addBtn = screen.getByRole("button", {name: /ekle/i})
    const delBtn = screen.getByRole("button", {name: /azalt/i})

    //? ekle butonu ekle
    await user.click(addBtn)

    //? addToBasket yöntemi doğru şekilde kullanıldı mı
    expect(addMockFn).toHaveBeenNthCalledWith(item)

    //? azalt butonu ekle
    await user.click(delBtn)

    //? removeFromBasket yöntemi doğru şekilde kullanıldı mı
    expect(removeMockFn).toHaveBeenCalledWith(item.id)
})