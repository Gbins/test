#!/bin/sh
p="$(cd "$(dirname "$0")";pwd)"
cd /usr
newver="newver.txt"
lastver="lastver.txt"
lasturl="lasturl.txt"
Barktxt="Barkurl.txt"
if [ ! -d test ]; then
  mkdir test
  cd /usr/test
  else
  cd /usr/test
fi
cp -p $p/imazing_check.sh /usr/test
if [ ! -f "$Barktxt" ]; then
    touch $Barktxt
read  -p "Please enter the Bark server address:"  Barkurl
echo $Barkurl > $Barktxt
bark=$(cat $Barktxt)
else
bark=$(cat $Barktxt)
fi
wget -O ver.txt http://updates.devmate.com/com.DigiDNA.iMazing2Windows.xml 
grep '<title>*.*</title>' ver.txt > $newver
sleep 3s
sed -i '1d' $newver 
sed -i 's/<title>//' $newver
sed -i 's#</title>##g' $newver
sed -i '2,$d' $newver
sed -i 's/[[:space:]]//g' $newver
n="$(cd "$(dirname "$0")";pwd)/$newver"
nver=$(cat $n)
o="$(cd "$(dirname "$0")";pwd)/$lastver"
lver=$(cat $o)
echo $nver > $lastver
grep -ohr -E "https?://[a-zA-Z0-9\.\/_&=@$%?~#-]*" ver.txt > $lasturl
sed  -i '1,4d;6,$d'  $lasturl
u="$(cd "$(dirname "$0")";pwd)/$lasturl"
myurl=$(cat $u)


echo $(cat $n)
if [ x"$(cat $n)" = "x" ]; then
  exit
fi
if [ -f $lver ]; then
  oldver=$lver
else
  oldver="0"
fi
echo $lver
if [ "$nver"  = "$lver" ]; then
   curl -o /dev/null -s -m 10 --connect-timeout 10 -w %{http_code} $bark/iMazing当前版本：$lver。暂无更新！
fi
if [ "$nver" != "$lver" ]; then
 curl -o /dev/null -s -m 10 --connect-timeout 10 -w %{http_code} $bark/iMazing当前版本:$nver。请下载！?copy=$myurl
 fi




