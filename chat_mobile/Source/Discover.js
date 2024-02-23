import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import React from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';


export default function User({ navigation }) {
  return (
    <ScrollView>

      <View>
        <View style={{ flexDirection: "row", backgroundColor: "blue", height: 50, alignItems: "center", justifyContent: 'center' }}>
          <AntDesign name="search1" size={25} color="white" />
          <View style={{ marginLeft: 20, marginTop: 2 }}>
            <TextInput
              placeholder="Tìm kiếm"
              style={{
                width: 200,
                fontSize: 18,
                color: "white",
                outlineStyle: "none",
              }}
            ></TextInput>
          </View>
          <Pressable
            onPress={() => {
              navigation.navigate("Setting");
            }}
            style={{ marginLeft: 90 }}
          >
            <SimpleLineIcons name="settings" size={24} color="white" />
          </Pressable>
        </View>
      </View>


      <View style={{ width: 420, height: 2800, backgroundColor: "#DCDCDC" }}>
        <View style={{ width: 420, height: 2800, backgroundColor: "white" }}>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../assets/zalovideo.png")}
              style={{
                width: 50,
                height: 50,
                marginTop: 10,
                marginLeft: 20,
                borderRadius: 90,
                resizeMode: 'contain'
              }}
            ></Image>
            <View style={{ top: 10 }}>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 20,
                  marginLeft: 20,
                  fontWeight: 400,

                }}
              >
                Zalo video
              </Text>

            </View>
            <View style={{ marginTop: 25, marginLeft: 170 }}>
              <AntDesign name="right" size={20} color="black" />
            </View>
          </View>


          <View
            style={{
              borderWidth: 5,
              borderColor: "#D3D3D3",
              width: 420,
              marginTop: 20,
            }}
          ></View>
          {/* ------------------------- */}

          <View style={{ flexDirection: "row" }}>

            <View>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 15,
                  marginLeft: 20,
                  fontWeight: 400,
                }}
              >
                Mini App yêu thích
              </Text>
            </View>
            <View>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 15,
                  marginLeft: 160,
                  fontWeight: 600,
                  color: 'blue',
                }}
              >
                Chỉnh sửa
              </Text>
            </View>
          </View>

          {/* list App */}

          <View style={{ flexDirection: "row", justifyContent: "space-around", right: 20 }}>
            <View style={{ flexDirection: 'column' }}>
              <Image
                source={require("../assets/gameicon.png")}
                style={{
                  width: 50,
                  height: 50,
                  marginTop: 10,
                  marginLeft: 20,
                  borderRadius: 90,
                  resizeMode: 'contain'
                }}
              ></Image>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 12,
                  marginLeft: 20,
                  fontWeight: 400,
                }}
              >Zalo games
              </Text>
            </View>
            <View style={{ flexDirection: 'column', right: 10 }}>
              <Image
                source={require("../assets/fe.png")}
                style={{
                  width: 50,
                  height: 50,
                  marginTop: 10,
                  marginLeft: 20,
                  borderRadius: 90,
                  resizeMode: 'contain'
                }}
              ></Image>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 12,
                  marginLeft: 20,
                  fontWeight: 400,
                }}
              >
                FE Credit
              </Text>
            </View>
            <View style={{ flexDirection: 'column', right: 10 }}>
              <Image
                source={require("../assets/zalopay.png")}
                style={{
                  width: 50,
                  height: 50,
                  marginTop: 10,
                  marginLeft: 20,
                  borderRadius: 90,
                  resizeMode: 'contain'
                }}
              ></Image>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 12,
                  marginLeft: 20,
                  fontWeight: 400,
                }}
              >
                Zalo pay
              </Text>
            </View>
            <View style={{ flexDirection: 'column' }}>
              <Image
                source={require("../assets/dvu.png")}
                style={{
                  width: 50,
                  height: 50,
                  marginTop: 10,
                  marginLeft: 20,
                  borderRadius: 90,
                  resizeMode: 'contain'
                }}
              ></Image>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 12,
                  marginLeft: 20,
                  fontWeight: 400,
                }}
              >Dịch vụ
              </Text>
            </View>

          </View>

          <View style={{ flexDirection: "row", justifyContent: 'space-around', right: 20 }}>
            <View style={{ flexDirection: 'column' }}>
              <Image
                source={require("../assets/zalovideo.png")}
                style={{
                  width: 50,
                  height: 50,
                  marginTop: 10,
                  marginLeft: 20,
                  borderRadius: 90,
                  resizeMode: 'contain'
                }}
              ></Image>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 12,
                  marginLeft: 20,
                  fontWeight: 400,
                }}
              >Zalo video
              </Text>
            </View>
            <View style={{ flexDirection: 'column' }}>
              <Image
                source={require("../assets/job.png")}
                style={{
                  width: 50,
                  height: 50,
                  marginTop: 10,
                  marginLeft: 20,
                  borderRadius: 90,
                  resizeMode: 'contain'
                }}
              ></Image>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 12,
                  marginLeft: 20,
                  fontWeight: 400,
                }}
              >
                Tìm việc
              </Text>
            </View>
            <View style={{ flexDirection: 'column' }}>
              <Image
                source={require("../assets/ticket.png")}
                style={{
                  width: 50,
                  height: 50,
                  marginTop: 10,
                  marginLeft: 20,
                  borderRadius: 90,
                  resizeMode: 'contain'
                }}
              ></Image>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 12,
                  marginLeft: 20,
                  fontWeight: 400,
                }}
              >
                Đặt vé phim
              </Text>
            </View>
            <View style={{ flexDirection: 'column' }}>
              <Image
                source={require("../assets/more.png")}
                style={{
                  width: 50,
                  height: 50,
                  marginTop: 10,
                  marginLeft: 20,
                  borderRadius: 90,
                  resizeMode: 'contain'
                }}
              ></Image>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 12,
                  marginLeft: 20,
                  fontWeight: 400,
                }}
              >Xem thêm
              </Text>
            </View>

          </View>


          {/* ------------------------ */}
          {/* border */}
          {/* <View
            style={{
              borderWidth: 3,
              borderColor: "#D3D3D3",
              width: 420,
              marginTop: 20,
            }}
          ></View> */}

          <View style={{ flexDirection: "row" }}>

            <View>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 15,
                  marginLeft: 20,
                  fontWeight: 400,
                }}
              >
                Sử dụng gần đây
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>

            <ScrollView>
              <View style={{ flexDirection: "row", justifyContent: 'flex-start' }}>
                <View style={{ flexDirection: 'column' }}>
                  <Image
                    source={require("../assets/avatar.png")}
                    style={{
                      width: 50,
                      height: 50,
                      marginTop: 10,
                      marginLeft: 20,
                      borderRadius: 90,
                      resizeMode: 'contain'
                    }}
                  ></Image>
                  <Text
                    style={{
                      marginTop: 10,
                      fontSize: 12,
                      marginLeft: 20,
                      fontWeight: 400,
                    }}
                  >AL Avatar
                  </Text>
                  <View></View>
                </View>
                <View style={{ flexDirection: 'column' }}>
                  <Image
                    source={require("../assets/job.png")}
                    style={{
                      width: 50,
                      height: 50,
                      marginTop: 10,
                      marginLeft: 20,
                      borderRadius: 90,
                      resizeMode: 'contain'
                    }}
                  ></Image>
                  <Text
                    style={{
                      marginTop: 10,
                      fontSize: 12,
                      marginLeft: 20,
                      fontWeight: 400,
                    }}
                  >
                    Tìm việc
                  </Text>
                </View>
                <View style={{ flexDirection: 'column' }}>
                  <Image
                    source={require("../assets/qr.png")}
                    style={{
                      width: 50,
                      height: 50,
                      marginTop: 10,
                      marginLeft: 20,
                      borderRadius: 90,
                      resizeMode: 'contain'
                    }}
                  ></Image>
                  <Text
                    style={{
                      marginTop: 10,
                      fontSize: 12,
                      marginLeft: 20,
                      fontWeight: 400,
                    }}
                  >
                    Ví QR
                  </Text>
                </View>

                <View style={{ flexDirection: 'column' }}>
                  <Image
                    source={require("../assets/music.png")}
                    style={{
                      width: 50,
                      height: 50,
                      marginTop: 10,
                      marginLeft: 20,
                      borderRadius: 90,
                      resizeMode: 'contain'
                    }}
                  ></Image>
                  <Text
                    style={{
                      marginTop: 10,
                      fontSize: 12,
                      marginLeft: 20,
                      fontWeight: 400,
                    }}
                  >nhạc chờ
                  </Text>
                </View>
                <View style={{ flexDirection: 'column' }}>
                  <Image
                    source={require("../assets/ticket.png")}
                    style={{
                      width: 50,
                      height: 50,
                      marginTop: 10,
                      marginLeft: 20,
                      borderRadius: 90,
                      resizeMode: 'contain'
                    }}
                  ></Image>
                  <Text
                    style={{
                      marginTop: 10,
                      fontSize: 12,
                      marginLeft: 20,
                      fontWeight: 400,
                    }}
                  >Đặt vé phim
                  </Text>
                </View>
                <View style={{ flexDirection: 'column' }}>
                  <Image
                    source={require("../assets/sticker.png")}
                    style={{
                      width: 50,
                      height: 50,
                      marginTop: 10,
                      marginLeft: 20,
                      borderRadius: 90,
                      resizeMode: 'contain'
                    }}
                  ></Image>
                  <Text
                    style={{
                      marginTop: 10,
                      fontSize: 12,
                      marginLeft: 20,
                      fontWeight: 400,

                    }}
                  >ZSticker Store
                  </Text>
                </View>

              </View>

            </ScrollView>

          </View>

          {/* border */}
          <View
            style={{
              borderWidth: 3,
              borderColor: "#D3D3D3",
              width: 420,
              marginTop: 20,
            }}
          ></View>

          <View style={{ flexDirection: "row" }}>

            <View>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 15,
                  marginLeft: 20,
                  fontWeight: 400,
                }}
              >
                Mini App nổi bật
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", borderBottomWidth: 1, paddingBottom: 15, borderColor: 'gray' }}>
            <View style={{ marginLeft: 20, marginTop: 20 }}>
              <Image
                source={require("../assets/bh.png")}
                style={{
                  marginTop: 10,
                  width: 50,
                  height: 50,
                  borderRadius: 90,
                  resizeMode: 'contain'
                }}
              ></Image>
            </View>
            <View >
              <Text
                style={{
                  marginTop: 20,
                  fontSize: 20,
                  marginLeft: 20,
                  fontWeight: 400,

                }}
              >
                Bảo hiểm online
              </Text>
              <Text style={{ fontSize: 15, marginLeft: 20 }}>
                Dễ dàng mua bảo hiểm xe máy, ô tô, tai nạn
              </Text>
              <View style={{ flexDirection: 'row', left: 20, top: 5 }}>
                <Entypo name="users" size={13} color="black" />
                <Text style={{ fontSize: 15, marginLeft: 20, bottom: 2, right: 10 }}>
                  Hơn 3.5 triệu người dùng
                </Text>
              </View>

            </View>

          </View>

          <View style={{ flexDirection: "row", borderBottomWidth: 1, paddingBottom: 15, borderColor: 'gray' }}>
            <View style={{ marginLeft: 20, marginTop: 20 }}>
              <Image
                source={require("../assets/sticker.png")}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 90,
                  marginTop: 10,
                  resizeMode: 'contain'
                }}
              ></Image>
            </View>
            <View >
              <Text
                style={{
                  marginTop: 20,
                  fontSize: 20,
                  marginLeft: 20,
                  fontWeight: 400,

                }}
              >
                ZSticker
              </Text>
              <Text style={{ fontSize: 15, marginLeft: 20 }}>
                Khám phá & quản lý sticker zalo
              </Text>
              <View style={{ flexDirection: 'row', left: 20, top: 5 }}>
                <Entypo name="users" size={13} color="black" />
                <Text style={{ fontSize: 15, marginLeft: 20, bottom: 2, right: 10 }}>
                  Hơn 900.000 người dùng
                </Text>
              </View>
            </View>

          </View>
          <View style={{ flexDirection: "row", }}>
            <View style={{ marginLeft: 20, marginTop: 20 }}>
              <Image
                source={require("../assets/avatar.png")}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 90,
                  marginTop: 10,
                  resizeMode: 'contain'
                }}
              ></Image>
            </View>
            <View >
              <Text
                style={{
                  marginTop: 20,
                  fontSize: 20,
                  marginLeft: 20,
                  fontWeight: 400,

                }}
              >
                AI Avatar
              </Text>
              <Text style={{ fontSize: 15, marginLeft: 20 }}>
                Tạo ảnh đại diện bằng công nghệ AI
              </Text>
              <View style={{ flexDirection: 'row', left: 20, top: 5 }}>
                <Entypo name="users" size={13} color="black" />
                <Text style={{ fontSize: 15, marginLeft: 20, bottom: 2, right: 10 }}>
                  Hơn 8 triệu người dùng
                </Text>
              </View>
            </View>

          </View>
          {/* border */}
          <View
            style={{
              borderWidth: 3,
              borderColor: "#D3D3D3",
              width: 420,
              marginTop: 20,
            }}
          ></View>

          <View style={{ flexDirection: "row" }}>

            <View>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 15,
                  marginLeft: 20,
                  fontWeight: 600,
                }}
              >
                Tìm việc
              </Text>
              <View style={{ bottom: 30, left: 350 }}>
                <EvilIcons name="chevron-right" size={35} color="gray" />
              </View>
            </View>
          </View>

          <View style={{ flexDirection: "row" }}>
            <View style={{ marginLeft: 20, marginTop: 20 }}>
              <Image
                source={require("../assets/spx.png")}
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 90,
                  right: 15,
                  bottom: 25,
                  resizeMode: 'contain'
                }}
              ></Image>
            </View>
            <View style={{ right: 20 }}>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 15,
                  marginLeft: 20,
                  fontWeight: "bold",
                }}
              >
                Tuyển 20 Shipperw khu vực Tân Bình
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <AntDesign name="enviroment" size={14} color="black" style={{ left: 15, top: 4 }} />
                <Text style={{ fontSize: 15, marginLeft: 20 }}>
                  TP. HCM, Tân Bình
                </Text>

              </View>
              <Text style={{ fontSize: 15, marginLeft: 20, color: 'orange', fontWeight: '400' }}>
                10-20 triệu/tháng
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: "row" }}>
            <View style={{ marginLeft: 20, marginTop: 20 }}>
              <Image
                source={require("../assets/ghtk.png")}
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 90,
                  right: 15,
                  bottom: 25,
                  resizeMode: 'contain'
                }}
              ></Image>
            </View>
            <View style={{ right: 20 }}>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 15,
                  marginLeft: 20,
                  fontWeight: "bold",
                }}
              >
                GHTK tuyển Nhân viên giao hàng
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <AntDesign name="enviroment" size={14} color="black" style={{ left: 15, top: 4 }} />
                <Text style={{ fontSize: 15, marginLeft: 20 }}>
                  TP. HCM, Quận 2
                </Text>

              </View>
              <Text style={{ fontSize: 15, marginLeft: 20, color: 'orange', fontWeight: '400' }}>
                15-20 triệu/tháng
              </Text>
            </View>
          </View>

          <View
            style={{
              borderWidth: 3,
              borderColor: "#D3D3D3",
              width: 420,
              marginTop: 20,
            }}
          ></View>

          <View style={{ flexDirection: "column" }}>

            <View>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 15,
                  marginLeft: 20,
                  fontWeight: 600,
                }}
              >
                Lịch bóng đá
              </Text>
            </View>
            <ScrollView>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flexDirection: 'column' }}>
                  <Image
                    source={require("../assets/tran1.png")}
                    style={{
                      width: 200,
                      height: 200,
                      resizeMode: 'contain'
                    }}
                  ></Image>
                </View>
                <View style={{ flexDirection: 'column' }}>
                  <Image
                    source={require("../assets/tran2.png")}
                    style={{
                      width: 200,
                      height: 200,
                      resizeMode: 'contain'
                    }}
                  ></Image>
                </View>
                <View style={{ flexDirection: 'column' }}>
                  <Image
                    source={require("../assets/tran3.png")}
                    style={{
                      width: 200,
                      height: 200,
                      resizeMode: 'contain'
                    }}
                  ></Image>
                </View>
                <View style={{ flexDirection: 'column' }}>
                  <Image
                    source={require("../assets/tran4.png")}
                    style={{
                      width: 200,
                      height: 200,
                      resizeMode: 'contain'
                    }}
                  ></Image>
                </View>
              </View>
            </ScrollView>
          </View>

          <View
            style={{
              borderWidth: 3,
              borderColor: "#D3D3D3",
              width: 420,
              marginTop: 20,
            }}
          ></View>

          <View style={{ flexDirection: "column" }}>

            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 15,
                  marginLeft: 20,
                  fontWeight: 600,
                }}
              >
                Dò vé số
              </Text>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 15,
                  marginLeft: 10,
                  fontWeight: 600,
                  color: "gray"
                }}
              >
                : Miền Nam 22/2
              </Text>
            </View>
            <ScrollView>
              <View style={{ flexDirection: "row" }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Image
                    source={require("../assets/lottery.png")}
                    style={{
                      width: 350,
                      height: 250,
                      resizeMode: 'contain',
                      bottom: 20,
                      marginLeft: 20
                    }}
                  ></Image>
                </View>

              </View>
            </ScrollView>
          </View>


          <View
            style={{
              borderWidth: 3,
              borderColor: "#D3D3D3",
              width: 420,

            }}
          ></View>

          <View style={{ flexDirection: "column" }}>

            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 15,
                  marginLeft: 20,
                  fontWeight: 600,
                }}
              >
                Lịch Việt
              </Text>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 15,
                  marginLeft: 10,
                  fontWeight: 600,
                  color: "gray"
                }}
              >
                : Xem lịch tháng
              </Text>
            </View>
            <ScrollView>
              <View style={{ flexDirection: "row" }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Image
                    source={require("../assets/calender.png")}
                    style={{
                      width: 350,
                      height: 250,
                      resizeMode: 'contain',
                      bottom: 40,
                      marginLeft: 20
                    }}
                  ></Image>
                </View>

              </View>
            </ScrollView>
          </View>

          <View
            style={{
              borderWidth: 3,
              borderColor: "#D3D3D3",
              width: 420,
              bottom:70
            }}
          ></View>

          <View style={{ flexDirection: "column",bottom:70 }}>

            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 15,
                  marginLeft: 20,
                  fontWeight: 600,
                }}
              >
                Zalo Connect
              </Text>
              <View style={{backgroundColor:'#F0FFFF', borderRadius:'20px', justifyContent:'center', alignItems:'center', marginTop: 10, marginLeft: 10,}}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: 'blue'
                  }}
                >
                  15+ Bài mới
                </Text>
              </View>
            </View>
            <ScrollView>
              <View style={{ flexDirection: "row",  }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Image
                    source={require("../assets/con1.png")}
                    style={{
                      width: 400,
                      height: 300,
                      resizeMode: 'contain',
                      marginBottom: 15,
                      
                    }}
                  ></Image>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Image
                    source={require("../assets/con2.png")}
                    style={{
                      width: 400,
                      height: 300,
                      resizeMode: 'contain',
                      marginBottom: 15,
                      marginLeft: 20
                    }}
                  ></Image>
                </View>

              </View>
            </ScrollView>
          </View>

          <View
            style={{
              borderWidth: 3,
              borderColor: "#D3D3D3",
              width: 420,
              bottom:70
            }}
          ></View>

          <View style={{ flexDirection: "column",bottom:70 }}>

            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 15,
                  marginLeft: 20,
                  fontWeight: 600,
                }}
              >
                Gợi ý Official Account
              </Text>
              <View style={{backgroundColor:'#F0FFFF', borderRadius:'20px', justifyContent:'center', alignItems:'center', marginTop: 10, marginLeft: 10,}}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: 'blue'
                  }}
                >
                  15+ Bài mới
                </Text>
              </View>
            </View>
            <ScrollView>
              <View style={{ flexDirection: "row", marginTop:10 }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Image
                    source={require("../assets/ac1.png")}
                    style={{
                      width: 400,
                      height: 300,
                      resizeMode: 'contain',
                      marginBottom: 15,
                      right:40
                      
                    }}
                  ></Image>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Image
                    source={require("../assets/ac2.png")}
                    style={{
                      width: 400,
                      height: 300,
                      resizeMode: 'contain',
                      marginBottom: 15,
                      right:150
                    }}
                  ></Image>
                </View>

              </View>
            </ScrollView>
          </View>






        </View>
      </View>
    </ScrollView>

  );
}