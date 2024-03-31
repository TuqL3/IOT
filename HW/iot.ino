#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>
#include <ArduinoJson.h>

#define DHTPIN D5
#define DHTTYPE DHT11
#define LIGHT_SENSOR_PIN A0

DHT_Unified dht(DHTPIN, DHTTYPE);

const char *ssid = "FPT Telecom-2EFE";
const char *password = "23041998";
const char *mqtt_server = "192.168.1.136";
const char *mqtt_username = "levantung";
const char *mqtt_password = "levantung";
const char *device_topic = "device";
const char *data_topic = "data";
const char *den_topic = "den";
const char *quat_topic = "quat";
const char *status_den_topic = "ttden";
const char *status_quat_topic = "ttquat";
const char *status_all_topic = "ttall";

WiFiClient espClient;
PubSubClient client(espClient);

unsigned long lastMsg = 0;
float temp, hum, light;

bool led1State = LOW;
bool led2State = LOW;

void setup_wifi() {
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(200);
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void callback(char *topic, byte *payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");

  char payloadStr[length + 1];
  for (int i = 0; i < length; i++) {
    payloadStr[i] = (char)payload[i];
  }
  payloadStr[length] = '\0';

  Serial.println(payloadStr);

  DynamicJsonDocument doc(256);
  deserializeJson(doc, payloadStr);

  String statusMsg = "";

  if (strcmp(topic, device_topic) == 0) {
    if (doc["den"] == "on") {
      digitalWrite(D6, HIGH);
      led1State = HIGH;
      client.publish(status_den_topic, "on");
    } else if (doc["den"] == "off") {
      digitalWrite(D6, LOW);
      led1State = LOW;
      client.publish(status_den_topic, "off");
    }

    if (doc["quat"] == "on") {
      digitalWrite(D7, HIGH);
      led2State = HIGH;
      client.publish(status_quat_topic, "on");
    } else if (doc["quat"] == "off") {
      digitalWrite(D7, LOW);
      led2State = LOW;
      client.publish(status_quat_topic, "off");
    }

    statusMsg = "Den: " + String(led1State == HIGH ? "on" : "off") + ", Quat: " + String(led2State == HIGH ? "on" : "off");
    client.publish(status_all_topic, statusMsg.c_str());
  } else if (strcmp(topic, den_topic) == 0) {
    if (strcmp(payloadStr, "on") == 0) {
      digitalWrite(D6, HIGH);
      led1State = HIGH;
      client.publish(status_den_topic, "on");
    } else if (strcmp(payloadStr, "off") == 0) {
      digitalWrite(D6, LOW);
      led1State = LOW;
      client.publish(status_den_topic, "off");
    }
    statusMsg = "Den: " + String(led1State == HIGH ? "on" : "off") + ", Quat: " + String(led2State == HIGH ? "on" : "off");
    client.publish(status_all_topic, statusMsg.c_str());
  } else if (strcmp(topic, quat_topic) == 0) {
    if (strcmp(payloadStr, "on") == 0) {
      digitalWrite(D7, HIGH);
      led2State = HIGH;
      client.publish(status_quat_topic, "on");
    } else if (strcmp(payloadStr, "off") == 0) {
      digitalWrite(D7, LOW);
      led2State = LOW;
      client.publish(status_quat_topic, "off");
    }
    statusMsg = "Den: " + String(led1State == HIGH ? "on" : "off") + ", Quat: " + String(led2State == HIGH ? "on" : "off");
    client.publish(status_all_topic, statusMsg.c_str());
  }
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    String clientId = "ESP8266Client-";
    clientId += String(random(0xffff), HEX);
    if (client.connect(clientId.c_str(), mqtt_username, mqtt_password)) {
      Serial.println("connected");
      client.subscribe(device_topic);
      client.subscribe(den_topic);
      client.subscribe(quat_topic);
      client.subscribe(status_den_topic);
      client.subscribe(status_quat_topic);
      client.subscribe(status_all_topic);
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}

void setup() {
  pinMode(D6, OUTPUT);
  pinMode(D7, OUTPUT);

  dht.begin();
  sensor_t sensor;
  dht.temperature().getSensor(&sensor);
  dht.humidity().getSensor(&sensor);

  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server, 1885);
  client.setCallback(callback);
}

void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  unsigned long now = millis();
  if (now - lastMsg > 3000) {
    lastMsg = now;

    sensors_event_t event;
    dht.temperature().getEvent(&event);
    if (!isnan(event.temperature)) {
      Serial.print(F("Temperature: "));
      Serial.print(event.temperature);
      Serial.println(F(" °C"));
      temp = event.temperature;
    }

    dht.humidity().getEvent(&event);
    if (!isnan(event.relative_humidity)) {
      Serial.print(F("Humidity: "));
      Serial.print(event.relative_humidity);
      Serial.println(F(" %"));
      hum = event.relative_humidity;
    }

    int lightValue = analogRead(LIGHT_SENSOR_PIN);
    light = lightValue;

    Serial.print("Light: ");
    Serial.print((int)light);
    Serial.println(F(" lux"));

    String msgStr = "Temp: " + String(temp) + "," + " Hum: " + String(hum) + "," + " Light: " + String((int)light);
    char msg[msgStr.length() + 1];
    msgStr.toCharArray(msg, sizeof(msg));
    client.publish(data_topic, msg);

    delay(50);
  }
}
