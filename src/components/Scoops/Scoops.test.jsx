import { render, screen } from "@testing-library/react"
import Scoops from "."
import userEvent from "@testing-library/user-event"

test("API dan alınan veriler için ekrana kartlar basılır", async () => {
    render(<Scoops />)

    //? ekrana basılan kartları al (resimleri almak yeterli)
    const images = await screen.findAllByAltText("çeşit-resim")

    //? ekrandaki resimlerin (kartların) sayısı 1 den fazla mı
    expect(images.length).toBeGreaterThanOrEqual(1)
})

test("Çeşitlerin ekleme ve azaltma işlevlerinin toplam fiyata etkisi", async () => {
    //? userEvent in kurulumunu yap
    const user = userEvent.setup()

    //? test edilecek bileşen render edilir
    render(<Scoops />)

    //? bütün ekleme ve azaltma butonlarını çağır
    const addBtns = await screen.findAllByRole("button", {name: "Ekle"})
    const delBtns = await screen.findAllByRole("button", {name: "Azalt"})

    //? toplam fiyat elementini çağır
    const total = screen.getByTestId("total")

    //? başlangıç anında toplam 0 mı kontrol et
    expect(total).toHaveTextContent(/^0$/)

    //? choclate ın ekle butonuna tıkla
    await user.click(addBtns[2])

    //? toplam fiyat 20 mi kontrol et
    expect(total).toHaveTextContent(/^20$/)

    //? vanilla nın ekle butonuna çift tıkla
    await user.dblClick(addBtns[1])

    //? toplam fiyat 60 mı kontrol et
    expect(total).toHaveTextContent(/^60$/)

    //? vanilla nın azalt butonuna tıkla
    await user.click(delBtns[1])

    //? toplam fiyat 40 mı kontrol et
    expect(total).toHaveTextContent(/^40$/)

    //? vanilla nın azalt butonuna tıkla
    await user.click(delBtns[1])

    //? toplam fiyat 20 mı kontrol et
    expect(total).toHaveTextContent(/^20$/)

    //? choclate ın azalt butonuna tıkla
    await user.click(delBtns[2])

    //? toplam fiyat 0 mı kontrol et
    expect(total).toHaveTextContent(/^0$/)
})