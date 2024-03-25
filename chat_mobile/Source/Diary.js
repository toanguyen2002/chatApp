import {
  View,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  TextInput,
  Pressable,
} from "react-native";
import React from "react";
import { SimpleLineIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

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
                // outlineStyle: "none",
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

      <View style={{ width: 420, height: 4800, backgroundColor: "#DCDCDC" }}>
        <View style={{ width: 420, height: 4800, backgroundColor: "white" }}>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../assets/avt1.png")}
              style={{
                width: 50,
                height: 50,
                marginTop: 10,
                marginLeft: 20,
                borderRadius: 90,
              }}
            ></Image>
            <View style={{ justifyContent: 'center', alignItems: "center", left: 8, top: 5 }}>
              <TextInput
                placeholder="Hôm nay bạn thế nào ?"
                style={{
                  width: '100%',
                  fontSize: 20,
                  color: "gray",
                  // outlineStyle: "none",
                }}
              ></TextInput>

            </View>

          </View>

          <View style={{ flexDirection: "row", marginTop: 20, marginLeft: 5 }}>

            <View style={{ flexDirection: 'row', backgroundColor: '#E8E9EB', borderRadius: '20px', height: 40, width: 90, justifyContent: 'center', alignItems: 'center' }}>
              <FontAwesome name="picture-o" size={24} color="green" />
              <Text style={{ fontWeight: '500', fontSize: '25' }}> Ảnh </Text>
            </View>
            <View style={{ flexDirection: 'row', backgroundColor: '#E8E9EB', borderRadius: '20px', height: 40, width: 90, justifyContent: 'center', alignItems: 'center', marginLeft: 5 }}>
              <FontAwesome name="video-camera" size={24} color="pink" />
              <Text style={{ fontWeight: '500', fontSize: '25' }}> Video </Text>
            </View>

            <View style={{ flexDirection: 'row', backgroundColor: '#E8E9EB', borderRadius: '20px', height: 40, width: 90, justifyContent: 'center', alignItems: 'center', marginLeft: 5 }}>
              <MaterialCommunityIcons name="image-album" size={24} color="blue" />
              <Text style={{ fontWeight: '500', fontSize: '25' }}> Album </Text>
            </View>

            <View style={{ flexDirection: 'row', backgroundColor: '#E8E9EB', borderRadius: '20px', height: 40, width: 90, justifyContent: 'center', alignItems: 'center', marginLeft: 5 }}>
              <AntDesign name="clockcircle" size={24} color="orange" />
              <Text style={{ fontWeight: '500', fontSize: '25' }}> Kỷ niệm </Text>
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
          <View style={{ flexDirection: "row" }}>

            <View>
              <Text
                style={{
                  marginTop: 10,
                  fontSize: 15,
                  marginLeft: 20,
                  fontWeight: 800,
                }}
              >
                Khoảng khắc
              </Text>
            </View>

          </View>
          <View style={{ flexDirection: 'row' }}>
            <ScrollView style={{ flexDirection: 'row' }}>
              <View style={{ flexDirection: 'row' }}>
                <Pressable style={{ width: 180, height: 180, }}>
                  <Image
                    source={require("../assets/vid1.png")}
                    style={{
                      width: 250,
                      height: 250,
                      marginTop: 10,
                      borderRadius: 90,
                      right: 30,
                      resizeMode: 'contain'
                    }}
                  ></Image>
                </Pressable>
                <Pressable style={{ width: 180, height: 180, }}>
                  <Image
                    source={require("../assets/vid2.png")}
                    style={{
                      width: 250,
                      height: 250,
                      marginTop: 10,
                      borderRadius: 90,
                      right: 30,
                      resizeMode: 'contain'
                    }}
                  ></Image>
                </Pressable>
                <Pressable style={{ width: 180, height: 180, }}>
                  <Image
                    source={require("../assets/vid4.png")}
                    style={{
                      width: 250,
                      height: 250,
                      marginTop: 10,
                      borderRadius: 90,
                      resizeMode: 'contain'
                    }}
                  ></Image>
                </Pressable>
                <Pressable >
                  <Image
                    source={require("../assets/vid3.png")}
                    style={{
                      width: 250,
                      height: 250,
                      marginTop: 10,
                      borderRadius: 90,

                      resizeMode: 'contain'
                    }}
                  ></Image>
                </Pressable>
              </View>
            </ScrollView>

          </View>
          {/* ---------post------------ */}
          <View
            style={{
              borderWidth: 3,
              borderColor: "#D3D3D3",
              width: 420,
              marginTop: 20,
            }}
          ></View>

          <View style={{ flexDirection: "row", }}>
            <View style={{ marginLeft: 20, marginTop: 15 }}>
              <Image
                source={require("../assets/avt1.png")}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 90,
                  marginTop: 5,
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
                Nguyễn Trọng Tuấn
              </Text>
              <Text style={{ fontSize: 15, marginLeft: 20, color: '#A1A1A1' }}>
                Hôm qua lúc 20:10
              </Text>
            </View>
            <View style={{ justifyContent: 'flex-end', bottom: 15, left: 80 }}>
              <AntDesign name="ellipsis1" size={25} color="black" />
            </View>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              source={require("../assets/pic1.png")}
              style={{
                width: 400,
                height: 300,
                resizeMode: 'contain',
                marginBottom: 15,
                right: 10
              }}
            ></Image>
          </View>

          <View style={{ flexDirection: "row", marginLeft: 25 }}>
            <Image
              source={require("../assets/laugh.png")}
              style={{
                width: 20,
                height: 20,
                resizeMode: 'contain',
                right: 10,
                bottom: 20
              }}
            ></Image>
            <Image
              source={require("../assets/heart.png")}
              style={{
                width: 20,
                height: 20,
                resizeMode: 'contain',
                right: 5,
                bottom: 20
              }}
            ></Image>
            <View style={{ bottom: 20, flexDirection: 'row' }}>
              <Text style={{ fontWeight: '500', fontSize: '25' }}> 15 người khác </Text>
              <Text style={{ fontWeight: '500', fontSize: '25', marginLeft: 130 }}> 12 Bình luận </Text>
            </View>

          </View>
          <View style={{ flexDirection: "row", bottom: 5, marginLeft: 15 }}>
            <View style={{ flexDirection: 'row', backgroundColor: '#E8E9EB', borderRadius: '20px', height: 40, width: 90, justifyContent: 'center', alignItems: 'center' }}>
              <AntDesign name="hearto" size={24} color="black" />
              <Text style={{ fontWeight: '500', fontSize: '25' }}> Thích </Text>
            </View>
            <View style={{ flexDirection: 'row', backgroundColor: '#E8E9EB', borderRadius: '20px', height: 40, width: 90, justifyContent: 'center', alignItems: 'center', marginLeft: 5 }}>
              <MaterialCommunityIcons name="comment-processing-outline" size={24} color="black" />
            </View>
          </View>

          {/* -------end------- */}
          <View
            style={{
              borderWidth: 3,
              borderColor: "#D3D3D3",
              width: 420,
              marginTop: 20,
            }}
          ></View>

          {/* ---------post2------------ */}
          <View style={{ flexDirection: "row", }}>
            <View style={{ marginLeft: 20, marginTop: 15 }}>
              <Image
                source={require("../assets/avt1.png")}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 90,
                  marginTop: 5,
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
                Lê Anh Duy
              </Text>
              <Text style={{ fontSize: 15, marginLeft: 20, color: '#A1A1A1' }}>
                Hôm qua lúc 20:10
              </Text>
            </View>
            <View style={{ justifyContent: 'flex-end', bottom: 15, left: 120 }}>
              <AntDesign name="ellipsis1" size={25} color="black" />
            </View>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              source={require("../assets/pic2.png")}
              style={{
                width: 400,
                height: 300,
                resizeMode: 'contain',
                marginBottom: 15,
                right: 10
              }}
            ></Image>
          </View>

          <View style={{ flexDirection: "row", marginLeft: 25 }}>
            <Image
              source={require("../assets/laugh.png")}
              style={{
                width: 20,
                height: 20,
                resizeMode: 'contain',
                right: 10,
                bottom: 20
              }}
            ></Image>
            <Image
              source={require("../assets/heart.png")}
              style={{
                width: 20,
                height: 20,
                resizeMode: 'contain',
                right: 5,
                bottom: 20
              }}
            ></Image>
            <View style={{ bottom: 20, flexDirection: 'row' }}>
              <Text style={{ fontWeight: '500', fontSize: '25' }}> 15 người khác </Text>
              <Text style={{ fontWeight: '500', fontSize: '25', marginLeft: 130 }}> 12 Bình luận </Text>
            </View>

          </View>
          <View style={{ flexDirection: "row", bottom: 5, marginLeft: 15 }}>
            <View style={{ flexDirection: 'row', backgroundColor: '#E8E9EB', borderRadius: '20px', height: 40, width: 90, justifyContent: 'center', alignItems: 'center' }}>
              <AntDesign name="hearto" size={24} color="black" />
              <Text style={{ fontWeight: '500', fontSize: '25' }}> Thích </Text>
            </View>
            <View style={{ flexDirection: 'row', backgroundColor: '#E8E9EB', borderRadius: '20px', height: 40, width: 90, justifyContent: 'center', alignItems: 'center', marginLeft: 5 }}>
              <MaterialCommunityIcons name="comment-processing-outline" size={24} color="black" />
            </View>
          </View>

          {/* -------end2------- */}
          <View
            style={{
              borderWidth: 3,
              borderColor: "#D3D3D3",
              width: 420,
              marginTop: 20,
            }}
          ></View>

          {/* ---------post3------------ */}
          <View style={{ flexDirection: "row", }}>
            <View style={{ marginLeft: 20, marginTop: 15 }}>
              <Image
                source={require("../assets/avt1.png")}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 90,
                  marginTop: 5,
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
                Huỳnh Phương Thảo
              </Text>
              <Text style={{ fontSize: 15, marginLeft: 20, color: '#A1A1A1' }}>
                Hôm qua lúc 20:10
              </Text>
            </View>
            <View style={{ justifyContent: 'flex-end', bottom: 15, left: 120 }}>
              <AntDesign name="ellipsis1" size={25} color="black" />
            </View>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              source={require("../assets/pic3.png")}
              style={{
                width: 400,
                height: 300,
                resizeMode: 'contain',
                marginBottom: 15,
                right: 10
              }}
            ></Image>
          </View>

          <View style={{ flexDirection: "row", marginLeft: 25 }}>
            <Image
              source={require("../assets/laugh.png")}
              style={{
                width: 20,
                height: 20,
                resizeMode: 'contain',
                right: 10,
                bottom: 20
              }}
            ></Image>
            <Image
              source={require("../assets/heart.png")}
              style={{
                width: 20,
                height: 20,
                resizeMode: 'contain',
                right: 5,
                bottom: 20
              }}
            ></Image>
            <View style={{ bottom: 20, flexDirection: 'row' }}>
              <Text style={{ fontWeight: '500', fontSize: '25' }}> 15 người khác </Text>
              <Text style={{ fontWeight: '500', fontSize: '25', marginLeft: 130 }}> 12 Bình luận </Text>
            </View>

          </View>
          <View style={{ flexDirection: "row", bottom: 5, marginLeft: 15 }}>
            <View style={{ flexDirection: 'row', backgroundColor: '#E8E9EB', borderRadius: '20px', height: 40, width: 90, justifyContent: 'center', alignItems: 'center' }}>
              <AntDesign name="hearto" size={24} color="black" />
              <Text style={{ fontWeight: '500', fontSize: '25' }}> Thích </Text>
            </View>
            <View style={{ flexDirection: 'row', backgroundColor: '#E8E9EB', borderRadius: '20px', height: 40, width: 90, justifyContent: 'center', alignItems: 'center', marginLeft: 5 }}>
              <MaterialCommunityIcons name="comment-processing-outline" size={24} color="black" />
            </View>
          </View>

          {/* -------end3------- */}
          <View
            style={{
              borderWidth: 3,
              borderColor: "#D3D3D3",
              width: 420,
              marginTop: 20,
            }}
          ></View>

          {/* ---------post4------------ */}
          <View style={{ flexDirection: "row", }}>
            <View style={{ marginLeft: 20, marginTop: 15 }}>
              <Image
                source={require("../assets/avt1.png")}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 90,
                  marginTop: 5,
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
                Đặng Ngọc Hà
              </Text>
              <Text style={{ fontSize: 15, marginLeft: 20, color: '#A1A1A1' }}>
                Hôm qua lúc 20:10
              </Text>
            </View>
            <View style={{ justifyContent: 'flex-end', bottom: 15, left: 120 }}>
              <AntDesign name="ellipsis1" size={25} color="black" />
            </View>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              source={require("../assets/pic4.png")}
              style={{
                width: 400,
                height: 300,
                resizeMode: 'contain',
                marginBottom: 15,
                right: 10
              }}
            ></Image>
          </View>

          <View style={{ flexDirection: "row", marginLeft: 25 }}>
            <Image
              source={require("../assets/laugh.png")}
              style={{
                width: 20,
                height: 20,
                resizeMode: 'contain',
                right: 10,
                bottom: 20
              }}
            ></Image>
            <Image
              source={require("../assets/heart.png")}
              style={{
                width: 20,
                height: 20,
                resizeMode: 'contain',
                right: 5,
                bottom: 20
              }}
            ></Image>
            <View style={{ bottom: 20, flexDirection: 'row' }}>
              <Text style={{ fontWeight: '500', fontSize: '25' }}> 15 người khác </Text>
              <Text style={{ fontWeight: '500', fontSize: '25', marginLeft: 130 }}> 12 Bình luận </Text>
            </View>

          </View>
          <View style={{ flexDirection: "row", bottom: 5, marginLeft: 15 }}>
            <View style={{ flexDirection: 'row', backgroundColor: '#E8E9EB', borderRadius: '20px', height: 40, width: 90, justifyContent: 'center', alignItems: 'center' }}>
              <AntDesign name="hearto" size={24} color="black" />
              <Text style={{ fontWeight: '500', fontSize: '25' }}> Thích </Text>
            </View>
            <View style={{ flexDirection: 'row', backgroundColor: '#E8E9EB', borderRadius: '20px', height: 40, width: 90, justifyContent: 'center', alignItems: 'center', marginLeft: 5 }}>
              <MaterialCommunityIcons name="comment-processing-outline" size={24} color="black" />
            </View>
          </View>


          {/* -------end4------- */}



          <View
            style={{
              borderWidth: 3,
              borderColor: "#D3D3D3",
              width: 420,
              marginTop: 20,
            }}
          ></View>

          {/* Bao moi1 */}
          <View style={{ flexDirection: "row", }}>
            <View style={{ marginLeft: 20, marginTop: 15 }}>
              <Image
                source={require("../assets/baomoi.png")}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 90,
                  marginTop: 5,
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
                Báo Mới
              </Text>
              <Text style={{ fontSize: 15, marginLeft: 20, color: '#A1A1A1' }}>
                Được tài trợ
              </Text>
            </View>
            <View style={{ justifyContent: 'flex-end', bottom: 15, left: 160 }}>
              <AntDesign name="ellipsis1" size={25} color="black" />
            </View>
          </View>

          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              source={require("../assets/new2.png")}
              style={{
                width: 400,
                height: 300,
                resizeMode: 'contain',
                bottom: 25,
                right: 10
              }}
            ></Image>

          </View>
          <View style={{ bottom: 55, width: '95%', marginLeft: 10 }}>
            <Text
              style={{ fontSize: 18, fontWeight: "600" }}>
              Chính phủ thống nhất giảm tuổi hưởng trợ cấp hưu trí từ 80 xuống 75 | BLĐ</Text>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', bottom: 20, right: 15 }}>
            <View style={{ flexDirection: 'row', bottom: 25, backgroundColor: '#E8E9EB', borderRadius: '20px', width: 350, height: 40, justifyContent: 'center', alignItems: 'center' }}>
              <AntDesign name="download" size={24} color="black" />
              <Pressable>
                Tải Ngay
              </Pressable>
            </View>
          </View>
          {/* End baomoi1 */}

          <View
            style={{
              borderWidth: 3,
              borderColor: "#D3D3D3",
              width: 420,
              marginTop: 5,
            }}
          ></View>

          {/* ---------post5------------ */}
          <View style={{ flexDirection: "row", }}>
            <View style={{ marginLeft: 20, marginTop: 15 }}>
              <Image
                source={require("../assets/avt1.png")}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 90,
                  marginTop: 5,
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
                Phạm Kiến Huy
              </Text>
              <Text style={{ fontSize: 15, marginLeft: 20, color: '#A1A1A1' }}>
                Hôm qua lúc 20:10
              </Text>
            </View>
            <View style={{ justifyContent: 'flex-end', bottom: 15, left: 120 }}>
              <AntDesign name="ellipsis1" size={25} color="black" />
            </View>
          </View>

          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              source={require("../assets/pic5.png")}
              style={{
                width: 400,
                height: 300,
                resizeMode: 'contain',
                marginBottom: 15,
                right: 10
              }}
            ></Image>
          </View>

          <View style={{ flexDirection: "row", marginLeft: 25 }}>
            <Image
              source={require("../assets/laugh.png")}
              style={{
                width: 20,
                height: 20,
                resizeMode: 'contain',
                right: 10,
                bottom: 20
              }}
            ></Image>
            <Image
              source={require("../assets/heart.png")}
              style={{
                width: 20,
                height: 20,
                resizeMode: 'contain',
                right: 5,
                bottom: 20
              }}
            ></Image>
            <View style={{ bottom: 20, flexDirection: 'row' }}>
              <Text style={{ fontWeight: '500', fontSize: '25' }}> 15 người khác </Text>
              <Text style={{ fontWeight: '500', fontSize: '25', marginLeft: 130 }}> 12 Bình luận </Text>
            </View>

          </View>
          <View style={{ flexDirection: "row", bottom: 5, marginLeft: 15 }}>
            <View style={{ flexDirection: 'row', backgroundColor: '#E8E9EB', borderRadius: '20px', height: 40, width: 90, justifyContent: 'center', alignItems: 'center' }}>
              <AntDesign name="hearto" size={24} color="black" />
              <Text style={{ fontWeight: '500', fontSize: '25' }}> Thích </Text>
            </View>
            <View style={{ flexDirection: 'row', backgroundColor: '#E8E9EB', borderRadius: '20px', height: 40, width: 90, justifyContent: 'center', alignItems: 'center', marginLeft: 5 }}>
              <MaterialCommunityIcons name="comment-processing-outline" size={24} color="black" />
            </View>
          </View>

          {/* -------end5------- */}
          <View
            style={{
              borderWidth: 3,
              borderColor: "#D3D3D3",
              width: 420,
              marginTop: 20,
            }}
          ></View>
          {/* Bao moi */}
          <View style={{ flexDirection: "row", }}>
            <View style={{ marginLeft: 20, marginTop: 15 }}>
              <Image
                source={require("../assets/baomoi.png")}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 90,
                  marginTop: 5,
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
                Báo Mới
              </Text>
              <Text style={{ fontSize: 15, marginLeft: 20, color: '#A1A1A1' }}>
                Được tài trợ
              </Text>
            </View>
            <View style={{ justifyContent: 'flex-end', bottom: 15, left: 160 }}>
              <AntDesign name="ellipsis1" size={25} color="black" />
            </View>
          </View>

          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              source={require("../assets/new1.png")}
              style={{
                width: 400,
                height: 300,
                resizeMode: 'contain',
                bottom: 25,
                right: 10
              }}
            ></Image>

          </View>
          <View style={{ bottom: 55, width: '95%', marginLeft: 10 }}>
            <Text
              style={{ fontSize: 18, fontWeight: "600" }}>Dự kiến tiền lương trung bình của công chức, viên chức sẽ có mức tăng vượt bậc. Tăng bao nhiêu ?</Text>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', bottom: 20, right: 15 }}>
            <View style={{ flexDirection: 'row', bottom: 25, backgroundColor: '#E8E9EB', borderRadius: '20px', width: 350, height: 40, justifyContent: 'center', alignItems: 'center' }}>
              <AntDesign name="download" size={24} color="black" />
              <Pressable>
                Tải Ngay
              </Pressable>
            </View>
          </View>
          {/* End baomoi */}
          <View
            style={{
              borderWidth: 3,
              borderColor: "#D3D3D3",
              width: 420,
              marginTop: 20,
            }}
          ></View>


          {/* ---------post6------------ */}
          <View style={{ flexDirection: "row", }}>
            <View style={{ marginLeft: 20, marginTop: 15 }}>
              <Image
                source={require("../assets/avt1.png")}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 90,
                  marginTop: 5,
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
                Lê Hoàng Nhân
              </Text>
              <Text style={{ fontSize: 15, marginLeft: 20, color: '#A1A1A1' }}>
                Hôm qua lúc 14:10
              </Text>
            </View>
            <View style={{ justifyContent: 'flex-end', bottom: 15, left: 120 }}>
              <AntDesign name="ellipsis1" size={25} color="black" />
            </View>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              source={require("../assets/pic6.png")}
              style={{
                width: 400,
                height: 300,
                resizeMode: 'contain',
                marginBottom: 15,
                right: 10
              }}
            ></Image>
          </View>

          <View style={{ flexDirection: "row", marginLeft: 25 }}>
            <Image
              source={require("../assets/laugh.png")}
              style={{
                width: 20,
                height: 20,
                resizeMode: 'contain',
                right: 10,
                bottom: 20
              }}
            ></Image>
            <Image
              source={require("../assets/heart.png")}
              style={{
                width: 20,
                height: 20,
                resizeMode: 'contain',
                right: 5,
                bottom: 20
              }}
            ></Image>
            <View style={{ bottom: 20, flexDirection: 'row' }}>
              <Text style={{ fontWeight: '500', fontSize: '25' }}> 15 người khác </Text>
              <Text style={{ fontWeight: '500', fontSize: '25', marginLeft: 130 }}> 12 Bình luận </Text>
            </View>

          </View>
          <View style={{ flexDirection: "row", bottom: 5, marginLeft: 15 }}>
            <View style={{ flexDirection: 'row', backgroundColor: '#E8E9EB', borderRadius: '20px', height: 40, width: 90, justifyContent: 'center', alignItems: 'center' }}>
              <AntDesign name="hearto" size={24} color="black" />
              <Text style={{ fontWeight: '500', fontSize: '25' }}> Thích </Text>
            </View>
            <View style={{ flexDirection: 'row', backgroundColor: '#E8E9EB', borderRadius: '20px', height: 40, width: 90, justifyContent: 'center', alignItems: 'center', marginLeft: 5 }}>
              <MaterialCommunityIcons name="comment-processing-outline" size={24} color="black" />
            </View>
          </View>


          {/* -------end6------- */}
          <View
            style={{
              borderWidth: 3,
              borderColor: "#D3D3D3",
              width: 420,
              marginTop: 20,
            }}
          ></View>
          

          <View style={{ flexDirection: "row", }}>
            <View style={{ marginLeft: 20, marginTop: 15 }}>
              <Image
                source={require("../assets/baomoi.png")}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 90,
                  marginTop: 5,
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
                Báo Mới
              </Text>
              <Text style={{ fontSize: 15, marginLeft: 20, color: '#A1A1A1' }}>
                Được tài trợ
              </Text>
            </View>
            <View style={{ justifyContent: 'flex-end', bottom: 15, left: 160 }}>
              <AntDesign name="ellipsis1" size={25} color="black" />
            </View>
          </View>

          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              source={require("../assets/new3.png")}
              style={{
                width: 400,
                height: 300,
                resizeMode: 'contain',
                bottom: 25,
                right: 10
              }}
            ></Image>

          </View>
          <View style={{ bottom: 55, width: '95%', marginLeft: 10 }}>
            <Text
              style={{ fontSize: 18, fontWeight: "600" }}>
              Pep Guardiola hết lời ca ngợi Phil Foden sau màn giải cứu Man City </Text>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', bottom: 20, right: 15 }}>
            <View style={{ flexDirection: 'row', bottom: 25, backgroundColor: '#E8E9EB', borderRadius: '20px', width: 350, height: 40, justifyContent: 'center', alignItems: 'center' }}>
              <AntDesign name="download" size={24} color="black" />
              <Pressable>
                Tải Ngay
              </Pressable>
            </View>
          </View>


        </View>
      </View>
    </ScrollView>
  );
}