<?php
// Überprüft, ob das Formular über die POST-Methode gesendet wurde
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Name aus dem Formular holen, schädliche Zeichen entfernen und HTML-Sonderzeichen konvertieren
    $name = htmlspecialchars(strip_tags($_POST["name"]));

    // E-Mail aus dem Formular holen, leere Zeichen entfernen und sicherstellen, dass es eine gültige E-Mail ist
    $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);

    // Nachricht aus dem Formular holen, schädliche Zeichen entfernen und HTML-Sonderzeichen konvertieren
    $message = htmlspecialchars(strip_tags($_POST["message"]));

    // Überprüfung: Ist die eingegebene E-Mail-Adresse wirklich gültig?
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("Ungültige E-Mail-Adresse.");
    }

    // Überprüfung: Ist die Nachricht länger als 500 Zeichen?
    if (strlen($message) > 500) {
        die("Die Nachricht darf maximal 500 Zeichen enthalten.");
    }

    // E-Mail-Daten definieren
    $to = "deine-email@example.com"; // ERSETZE DIES DURCH DEINE EIGENE E-MAIL-ADRESSE!
    $subject = "Neue Kontaktanfrage von $name";
    
    // Header für die E-Mail setzen (Absender-Adresse & Antwort-Adresse)
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8";

    // Nachrichtentext für die E-Mail
    $body = "Name: $name\n";
    $body .= "E-Mail: $email\n\n";
    $body .= "Nachricht:\n$message";

    // Die E-Mail mit der Funktion `mail()` senden
    if (mail($to, $subject, $body, $headers)) {
        echo "Danke für Ihre Nachricht! Wir melden uns bald.";
    } else {
        echo "Fehler beim Senden der Nachricht.";
    }
} else {
    // Falls das Formular nicht über POST gesendet wurde, eine Fehlermeldung anzeigen
    echo "Ungültige Anfrage.";
}
?>
