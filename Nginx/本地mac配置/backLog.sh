# LOGPATH=/usr/local/etc/nginx/logs/access.logs
# BASEPATH=/usr/local/etc/nginx/backLogs
# bak=$BASEPATH/$(date  +%y%m%d%H%M).access.log
# mv $LOGPATH $bak
# touch $LOGPATH

# nginx -s reload

LOGPATH=/usr/local/etc/nginx/logs/access.log
BASEPATH=/usr/local/etc/nginx/backLogs/$(date +%Y%m)
mkdir -p $BASEPATH
bak=$BASEPATH/$(date +%d%H%M).access.log
mv $LOGPATH $bak
touch $LOGPATH
/usr/local/Cellar/nginx/1.17.3_1/bin/nginx -s reopen
# kill -USR1 `cat /usr/local/etc/nginx/nginx.pid`
# /usr/local/etc/nginx/backLog.sh