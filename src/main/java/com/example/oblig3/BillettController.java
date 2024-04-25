package com.example.oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class BillettController {
    @Autowired
    private BillettRepository rep;

    @PostMapping("/lagre")
    public void lagreBillett(@RequestBody Billett billett) {
        rep.lagreBilletter(billett);
    }

    @GetMapping("/hentAlle")
    public List<Billett> hentAlleBilletter() {
        return rep.hentAlleBilletter();
    }

    @GetMapping("/hentEn")
    public Billett hentEnBillett(@RequestParam Integer id) {
        return rep.hentEnBillett(id);
    }

    @GetMapping("/slettEn")
    public void slettEn(Integer id) {
        rep.slettEn(id);
    }


    @DeleteMapping("/slettAlleBilletter")
    public void slettAlle() {
        rep.slettAlle();
    }
}
